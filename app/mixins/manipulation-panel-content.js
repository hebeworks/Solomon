import Ember from 'ember';

export default Ember.Mixin.create({
    // mainTitle: Ember.computed.alias('appController.manipulationPanelState.title'),
    model: Ember.computed.alias('appController.manipulationPanelState.model'),
});
