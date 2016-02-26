import Ember from 'ember';

export default Ember.Mixin.create({
    model: Ember.computed.alias('appController.manipulationPanelState.model'),
});
