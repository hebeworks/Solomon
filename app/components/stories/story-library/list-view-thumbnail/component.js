import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	classNames: 'thumb',
	
	click: function() {
		this.sendAction('action', this.model);
	}
});
