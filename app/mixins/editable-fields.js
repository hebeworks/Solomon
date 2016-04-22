import Ember from 'ember';

export default Ember.Mixin.create({
  fetchEditableFieldValue(name) {
    const config = this.get('storyModel.config');
    if (!config) return '';
    const item = config.findBy('name', name);

    return item ? item.get('value') : '';
  },

  saveEditableFieldValue(name, value) {
    const config = this.get('storyModel.config');
    if (!config) return null;
    const item = config.findBy('name', name);
    if (item) {
      item.set('value', value);
      this.set('action', 'saveCanvasState');
      this.sendAction('action');
    }
    return item ? item.get('value') : null;
  },

  setupEditableFields: function setupEditableFields() {
    const story = this.get('storyModel');
    if (!story) return;

    const config = this.get('editableFields') || [];
    if (story.get('config.length') > 0) return;

    config.forEach((object) => {
      story.addConfigItem(object);
    });
  }.on('init').observes('storyModel'),
});
