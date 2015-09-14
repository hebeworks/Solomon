import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
        duplicateCanvas: function () {
			this.get('appController').hideModal();
			this.sendAction('action');
			return true;
        }
	}
});
