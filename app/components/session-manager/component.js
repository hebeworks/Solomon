import Ember from 'ember';

export default Ember.Component.extend({

  loggingIn: false,

  actions: {

    reset(){
      const container = this.get('session.container');
      const authenticator = container.lookup('simple-auth-authenticator:lock');
      const lock = authenticator.get('lock');

      lock.hide()
    },

    login(){
      this.send('reset');
      this.set('loggingIn', true);
      this.get('session').authenticate('simple-auth-authenticator:lock', {
        container: 'session__embed'
      });
    },

    logout(){
      this.get('session').invalidate();
      this.set('loggingIn', false);
    }

  }

});
