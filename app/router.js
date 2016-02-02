/* global ga */
import Ember from 'ember';
import config from 'hebe-dash/config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  notifyGoogleAnalytics: function () {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});

Router.map(function () {
  this.route('statnotices', function () {
    this.route('view', { path: '/:statnotice_id' });
    this.route('intro');
  });

  this.route('canvas', { path: 'canvas/:canvas_id' });
  this.route('canvas-picker');
  this.route('gallery');
  this.route('styleguide');
  this.route('sign_in');
});

export default Router;
