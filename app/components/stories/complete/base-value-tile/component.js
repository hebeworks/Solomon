/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: '-white',
    tileValue: 'Value',
    tileDesc1: 'Description 1',
    tileDesc2: 'Description 2',
    tileShade: '',
    storyModel: null,

    onInserted: function () {
        var _this = this;
        var timer = setInterval(function () {
            var story = _this.get('storyModel');
            if (!Ember.isEmpty(story)) {
                _this.setupEditableFields();
                clearInterval(timer);
                _this.set('timer', null);
            }
            // var config = _this.get('storyModel.config');
        }, 1000);
        this.set('timer', timer);
    }.on('didInsertElement'),

    setupEditableFields: function () {
        var story = this.get('storyModel');
        story.addConfigItem({ name: 'value', type: 'text', value: '', placeholder: 'Enter a value' });
        story.addConfigItem({ name: 'description', type: 'text', value: '', placeholder: 'Enter a description' });
        story.addConfigItem({ name: 'description2', type: 'text', value: '', placeholder: 'Enter a second description' });
    }
});
