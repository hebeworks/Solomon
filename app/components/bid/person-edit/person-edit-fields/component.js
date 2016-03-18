import Ember from 'ember';

export default Ember.Component.extend({
    people: Ember.computed.alias('target.people'),
    multiplePeople: Ember.computed.alias('target.multiplePeople'),
    chosenPerson: Ember.computed.alias('target.chosenPerson'),
    allOccupants: Ember.computed.alias('target.allOccupants'),
    
    actions: {
        cancel: function() {
            this.set('action', 'cancel');
            this.send('action');
        },
        
        save: function() {
            this.set('action', 'save');
            this.send('action');
        }
    }
});
