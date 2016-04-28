import Ember from 'ember';

export default Ember.Object.extend({

  id: Ember.computed.oneWay('user_id'),

  email: null,

  email_verified: null,

  name: null,

  picture: null,

  created_at: null,

  updated_at: null,

  last_ip: null,

  last_login: null,

  logins_count: null,

  metaData: null,

  permissions: null,

  username: function(){
    var email = this.get('email');
    var name = '';

    if(email){
      name = email.split('@')[0];
    }

    return name;
  }.property('email'),

  isAdmin: function(){
    return this.get('app_metadata.is_admin') === true;
  }.property('app_metadata.is_admin')

});
