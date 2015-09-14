import Ember from 'ember';

export default Ember.Mixin.create({
	title: null,
	model:null,
	
	onConfigUpdate: function() {
		this.setProperties({
			title: this.get('appController.bottomDrawerConfig.title'),
			model: this.get('appController.bottomDrawerConfig.model'),
		});
	}.observes('appController.bottomDrawerConfig')
});
