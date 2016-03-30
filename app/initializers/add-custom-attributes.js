export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.LinkComponent.reopen({
    attributeBindings: ['cpn-button', 'cpn-text']
  });
}

export default {
  name: 'add-custom-attributes',
  initialize: initialize
};
