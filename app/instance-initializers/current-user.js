/* globals Ember */
// app/instance-initializers/current-user.js
import User from 'hebe-dash/models/user';

export default {
  name: 'current-user',
  initialize({ registry }) {
    const session = registry.lookup('simple-auth-session:main');
    let user = User.create(session.get('secure.profile'));
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
        user.setProperties(profile);
      }
    }

    Ember.addObserver(session, 'secure', this, syncObjects);

    registry.register('service:current-user', proxy, { instantiate: false, singleton: true });
    registry.injection('route', 'currentUser', 'service:current-user');
    registry.injection('controller', 'currentUser', 'service:current-user');
    registry.injection('component', 'currentUser', 'service:current-user');
  },
};
