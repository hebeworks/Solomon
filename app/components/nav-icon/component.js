import Ember from 'ember';

export default Ember.Component.extend({
    click: function() {
        this.setSelectedState();        
        this.sendAction('action', this.get('route'));
    },
    
    setSelectedState: function() {
        //todo: toggle based on if the action results in a state
        //todo: register a listener so when that state ends, selected is removed
        this.$('.js-nav-icon').toggleClass('-selected')
    }
});
