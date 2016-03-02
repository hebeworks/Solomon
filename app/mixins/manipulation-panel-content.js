import Ember from 'ember';

export default Ember.Mixin.create({
    panelState: Ember.computed.alias('appController.manipulationPanel.state'),
        isClosing: Ember.computed.alias('panelState.closing'),
        isOpening: Ember.computed.alias('panelState.opening'),
    
    panelOptions: Ember.computed.alias('appController.manipulationPanel.options'),
        model: Ember.computed.alias('panelOptions.model'),
        title: Ember.computed.alias('panelOptions.title'),
        subTitle: Ember.computed.alias('panelOptions.subTitle'),
});
