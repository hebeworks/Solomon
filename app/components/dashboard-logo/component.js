import Ember from 'ember';

export default Ember.Component.extend({
  logoClass: Ember.computed('appSettings.solomonConfig', function () {
      return this.get('appSettings.solomonConfig.name') + '-logo';
  }),

  logoText: Ember.computed.alias('appSettings.solomonConfig.title'),

  svgLogo: Ember.computed('appSettings.solomonConfig.logoType', function() {
    if (this.get('appSettings.solomonConfig.logoType') === 'svg') {
      return true;
    }
    return false;
  }),

  homeRoute: function homeRoute() {
    return this.get('currentUser.defaultCanvas') || this.get('actionParam') || 'index';
  }.property(),

  click() {
    alert(this.get('homeRoute'));
    this.sendAction('action', this.get('homeRoute'));
  },
});
