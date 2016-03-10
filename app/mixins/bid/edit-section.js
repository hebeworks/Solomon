import Ember from 'ember';

export default Ember.Mixin.create({
    sectionOpenState: 'is-closed',
    
    embedSectionGraphic: function() {
        console.log('embedSectionGraphic');
        Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
    }.on('init'),
    
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
