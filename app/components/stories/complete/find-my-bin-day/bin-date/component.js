import Ember from 'ember';

export default Ember.Component.extend({
    
    toggleState: 'down',
    extraState: 'none',

    actions: {
        
        toggleExtra: function() {
            var state = this.get('toggleState');
            
            if (state == 'up') {
                this.set('toggleState', 'down');
                this.set('extraState', 'none');
            } else {
                this.set('toggleState', 'up');
                this.set('extraState', 'block');
            }
        }
    }
});
