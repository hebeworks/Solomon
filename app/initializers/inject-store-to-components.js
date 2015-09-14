export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'inject-store-to-components',
  after: 'ember-data',
  initialize: function(container, application){
      // application.register('store:main', 'app.store');
      // container.injection('component', 'store', 'store:main');
      application.inject('component', 'store', 'service:store') 
  }
};