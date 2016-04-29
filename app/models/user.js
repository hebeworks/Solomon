import Ember from 'ember';
import config from 'hebe-dash/config/environment';

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

  username: function username() {
    const email = this.get('email');
    let name = '';
    if (email) {
      name = email.split('@')[0];
    }
    return name;
  }.property('email'),

  isAdmin: function isAdmin() {
    return this.get('app_metadata.is_admin') === true;
  }.property('app_metadata.is_admin'),

  defaultCanvas: function defaultCanvas() {
    return this.get('metaData.defaultCanvas');
  }.property('metaData', 'metaData.defaultCanvas'),
});
