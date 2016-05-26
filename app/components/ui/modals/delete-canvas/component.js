import Ember from 'ember';

export default Ember.Component.extend({
    model: Ember.computed.alias('controller.modalOptions.model'),
    
    actions: {
        deleteACanvas: function () {
            this.get('appController').hideModal();
            this.sendAction('action');
            return true;
        }
    }
});
