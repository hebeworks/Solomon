/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {

    initialConfig: {
        color: 'blue',
        viewOnly: true
    },

    editableFields: function(){
        return [
            {
                name: 'title',
                type: 'text',
                value: '',
                placeholder: 'Title text'
            },
            {
                name: 'description',
                type: 'markdown',
                value: '',
                placeholder: 'Description (can include markdown)'
            },
            {
                name: 'image_url',
                type: 'text',
                value: '',
                placeholder: 'Image URL'
            },
            {
                name: 'story_colour',
                type: 'enum',
                sourceContent: JSON.stringify([{ text: 'white', id: 'white' }, { text: 'medium-blue', id: 'medium-blue' }]),
                value: '',
                placeholder: 'Choose a story colour'
            }
        ];
    }.property('storyModel.config'),

    onColourChanged: function () {
        var colour = this.fetchEditableFieldValue('story_colour');
        if (!Ember.isEmpty(colour)) {
            this.set('storyConfig.color', colour);
        }
    }.on('didInsertElement').observes('storyModel.config.@each.value'),
    
    title: function(){
        return this.fetchEditableFieldValue('title');
    }.property('storyModel.config.@each.value'),

    description: function(){
        return this.fetchEditableFieldValue('description');
    }.property('storyModel.config.@each.value'),

    image_url: function(){
        return this.fetchEditableFieldValue('image_url');
    }.property('storyModel.config.@each.value')

});
