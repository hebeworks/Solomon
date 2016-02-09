import Ember from 'ember';

export default Ember.Component.extend({

  initAuthenticationEmbed: function(){
    if(!this.get('session.isAuthenticated')){
      this.send('reset');
      this.get('session').authenticate('simple-auth-authenticator:lock', {
        container: 'session__embed'
      });
    }

  }.on('didRender'),

  actions: {

    reset(){
      const container = this.get('session.container');
      const authenticator = container.lookup('simple-auth-authenticator:lock');
      const lock = authenticator.get('lock');

      lock.hide()
    },

    logout(){
      this.get('session').invalidate();
    }

  }

});
