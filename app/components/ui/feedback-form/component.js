import Ember from 'ember';

export default Ember.Component.extend({
    title: Ember.computed({
		set(key, value) {
			this.set('target.modalTitle', value);
		}
	}),

	didReceiveAttrs: function () {
		this.set('title', 'Please provide us with your feedback');
	}

});
