import Ember from 'ember';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  
  Ember.Route.reopen({
    activate: function () {
      this._super();
      Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
    },
    deactivate: function () {
      this._super();
      Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
    },
    didRenderElement: function () {
      // Override this in your View's
      //        console.log('Component didRenderElement SVG EMBED');
      grunticon.embedSVG();
    }
  });
}

export default {
  name: 'add-svg-embed-on-route-activate',
  initialize: initialize
};
