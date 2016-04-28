/* globals Ember */
// app/instance-initializers/current-user.js
import User from 'hebe-dash/models/user';
import config from 'hebe-dash/config/environment';

export default {
  name: 'current-user',
  initialize({ registry }) {

    const session = registry.lookup('simple-auth-session:main');
    const appSettings = registry.lookup('service:solomon-settings');
    const solomonAPIURL = config.APP.solomonAPIURL;
    let user = User.create(session.get('secure.profile'));

    function loadUser(baseUser) {
      if (baseUser) {
        const userID = baseUser.user_id;
        if (userID) {
          // load the user from the solomon api
          const headers = [{ key: 'Solomon-Client-Override',
                              value: config.APP.solomonClientOverride }];
          appSettings.getData(`${solomonAPIURL}/api/users/${userID}`,
                                  false, 'get', null, true, headers)
          .then(
            (foundUser) => {
              user.setProperties(foundUser);
            },
            (/* err */) => {
              user.setProperties(baseUser);
              // appSettings.set('errorMessage',
              //   'Sorry, your user was not loaded correctly, please try log out and back in.')
            }
          );
        }
      }
    }

    if (user) {
      loadUser(user);
    }

    const proxy = Ember.ObjectProxy.create({
      isServiceFactory: true,
      content: user,
    });

    function syncObjects() {
      const profile = session.get('secure.profile');
      if (!profile) {
        user.destroy();
        user = User.create();
        proxy.set('content', user);
      } else {
        loadUser(profile);
      }
    }

    Ember.addObserver(session, 'secure', this, syncObjects);

    registry.register('service:current-user', proxy, { instantiate: false, singleton: true });
    registry.injection('route', 'currentUser', 'service:current-user');
    registry.injection('controller', 'currentUser', 'service:current-user');
    registry.injection('component', 'currentUser', 'service:current-user');
  },
};
