export function initialize(/* container, application */) {
	// application.inject('route', 'foo', 'service:foo');
  
	Ember.Component.reopen({
		target: Ember.computed.alias("targetObject")
	});
}

export default {
	name: 'auto-bubble-component-actions',
	initialize: initialize
};





