import Ember from 'ember';

export default Ember.Component.extend({

  lock: function lock(){
    const container = this.get('session.container');
    // const authenticator = container.lookup('simple-auth-authenticator:lock');
    const authenticator = container.lookup('authenticator:solomon-api-authenticator');
    return authenticator.get('lock');
  }.property(),

  setupAuthentication: function setupAuthentication(){
    if (!this.get('session.isAuthenticated')){
      this.get('lock').$dicts.en['signin']['action'] = 'Log in';
      this.send('reset');
      const lockOptions = { container: 'session__embed' };
      // this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
      this.get('session').authenticate('authenticator:solomon-api-authenticator', lockOptions);
    }
  }.on('didRender'),

  actions: {
    reset() {
      this.get('lock').hide();
    },
    logout() {
      this.get('session').invalidate();
    },
  },
});
