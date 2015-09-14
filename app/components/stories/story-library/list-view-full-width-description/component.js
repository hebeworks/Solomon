import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	classNames: 'list-item -full-width',
	
	click: function() {
		this.sendAction('action', this.model);
	}
});
