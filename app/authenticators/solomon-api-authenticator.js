// app/authenticators/my-cool-authenticator.js

import Base from 'auth0-ember-simple-auth/authenticators/lock';
import config from 'hebe-dash/config/environment';

export default Base.extend({

  /**
   * Hook that gets called after the jwt has expired
   * but before we notify the rest of the system.
   * Great place to add cleanup to expire any third-party
   * tokens or other cleanup.
   *
   * IMPORTANT: You must return a promise, else logout
   * will not continue.
   *
   * @return {Promise}
   */
  // beforeExpire () {
  //   return Ember.RSVP.resolve();
  // },

  /**
   * Hook that gets called after Auth0 successfully
   * authenticates the user.
   * Great place to make additional calls to other
   * services, custom db, firebase, etc. then
   * decorate the session object and pass it along.
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data Session object
   * @return {Promise}     Promise with decorated session object
   */
  //  afterAuth: function(data){
  //   return Ember.RSVP.resolve(data);
  // },
  afterAuth (data) {

    return new Ember.RSVP.Promise((resolve, reject, complete) => {
      if (data && data.profile) {
        const userID = data.profile.user_id;
        const appSettings = this.get('appSettings');
        const solomonAPIURL = config.APP.solomonAPIURL;

        if (userID) {
          // load the user from the solomon api
          const headers = [
            { key: 'Solomon-Client-Override', value: config.APP.solomonClientOverride },
            { key: 'Authorization', value: `Bearer ${data.jwt}` },
          ];

          appSettings.getData(`${solomonAPIURL}/api/users/${userID}`,
                                false, 'get', null, false, headers)
          .then(
            (foundUser) => {
              data.profile.metaData = foundUser.metaData;
              return resolve(data);
            },
            (/* err */) => {
              return resolve(data);
            }
          );
        }
      }
    });
  },

  /**
   * Hook called after auth0 refreshes the jwt
   * based on the refreshToken.
   *
   * This only fires if lock.js was passed in
   * the offline_mode scope params
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data The new jwt
   * @return {Promise}     The decorated session object
   */
  // afterRestore (data) {
  //   return Ember.RSVP.resolve(data);
  // },

  /**
   * Hook that gets called after Auth0 successfully
   * refreshes the jwt if (refresh token is enabled).
   *
   * Great place to make additional calls to other
   * services, custom db, firebase, etc. then
   * decorate the session object and pass it along.
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data Session object
   * @return {Promise}     Promise with decorated session object
   */
  // afterRefresh (data) {
  //   return Ember.RSVP.resolve(data);
  // }

});