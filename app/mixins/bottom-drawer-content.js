import Ember from 'ember';

export default Ember.Mixin.create({
	mainTitle: Ember.computed.alias('appController.bottomDrawerConfig.title'),
	model: Ember.computed.alias('appController.bottomDrawerConfig.model'),
});
