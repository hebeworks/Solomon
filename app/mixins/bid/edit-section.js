import Ember from 'ember';

export default Ember.Mixin.create({
    sectionOpenState: 'is-closed',
    
    actions: {
        toggleSection: function() {
            if (this.get('sectionOpenState') == 'is-closed') {
                this.set('sectionOpenState', 'is-open');
            } else {
                this.set('sectionOpenState', 'is-closed');
            }
        }
    }
});
