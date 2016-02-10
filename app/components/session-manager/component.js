import Ember from 'ember';

export default Ember.Component.extend({

  lock: function(){
    const container = this.get('session.container');
    const authenticator = container.lookup('simple-auth-authenticator:lock');

    return authenticator.get('lock');
  }.property(),

  setupAuthentication: function(){
    if(!this.get('session.isAuthenticated')){
      this.get('lock').$dicts.en['signin']['action'] = 'Log in';
      this.send('reset');
      this.get('session').authenticate('simple-auth-authenticator:lock', {
        container: 'session__embed'
      });
    }
  }.on('didRender'),

  actions: {

    reset(){
      this.get('lock').hide();
    },

    logout(){
      this.get('session').invalidate();
    }

  }

});
