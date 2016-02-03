import Ember from 'ember';

export default Ember.Component.extend({

  profile: Ember.computed.alias('session.secure.profile'),

  profileMeta: Ember.computed.alias('profile.user_metadata'),

  profileAppMeta: Ember.computed.alias('profile.app_metadata')

});
