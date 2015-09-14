import Ember from 'ember';

export default Ember.Component.extend({
		classNameBindings: ['classes'],
		click: function(){
			// alert('generic click: ' + this.get('action'));
			this.sendAction('action')
		}
		
});
