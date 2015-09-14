import Ember from 'ember';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'add-svg-embed-to-component-did-insert',
  initialize: function(container, application) {
    //      container.register('store:main', 'app.store');
    //      container.injection('component', 'store', 'store:main');

//    Ember.Component.reopen({
//      didInsertElement: function () {
//        this._super();
//        Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
//      },
//      didRenderElement: function () {
//        // Override this in your View's
//        console.log('Component didRenderElement SVG EMBED');
//        grunticon.embedSVG();
//      }
//    });


  }
};