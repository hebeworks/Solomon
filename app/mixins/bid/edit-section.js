import Ember from 'ember';

export default Ember.Mixin.create({
  sectionOpenState: 'is-closed',
  embedSectionGraphic: function() {
    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
  }.on('init'),

  actions: {
    toggleSection() {
      if (this.get('sectionOpenState') === 'is-closed') {
        this.set('sectionOpenState', 'is-open');
      } else {
        this.set('sectionOpenState', 'is-closed');
      }
    }
  }
});
