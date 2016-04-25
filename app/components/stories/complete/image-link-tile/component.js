/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '',
        subTitle: '', // (Provide a story subtitle)
        width: '1', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '1', // (Set the height of the story)
        scroll: false, // (Should the story vertically scroll its content?)
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
                name: 'image_url',
                type: 'text',
                value: '',
                placeholder: 'Image URL'
            },
            {
                name: 'image_desc',
                type: 'text',
                value: '',
                placeholder: 'Image description'
            },
            {
                name: 'link_url',
                type: 'text',
                value: '',
                placeholder: 'Link URL'
            },
            {
                name: 'story_colour',
                type: 'enum',
                sourceContent: JSON.stringify([
                    { text: 'White', id: 'white' },
                    { text: 'Medium blue', id: 'medium-blue' },
                    { text: 'Dark blue', id: 'dark-blue' },
                    { text: 'Green', id: 'lime' },
                    { text: 'Yellow', id: 'yellow' },
                    { text: 'Black', id: 'black' }
                ]),
                value: '',
                placeholder: 'Choose a story colour'
            }
        ];
    }.property('storyModel.config'),
    
    onColourChanged: function () {
        const colour = this.fetchEditableFieldValue('story_colour');
        if (!Ember.isEmpty(colour)) {
            this.set('storyConfig.color', colour);
        }
    }.on('didInsertElement').observes('storyModel.config.@each.value'),
    
    onTitleChanged: function() {
        const title = this.fetchEditableFieldValue('title');
        if (!Ember.isEmpty(title)) {
            this.set('storyConfig.title', title);
        }
    }.on('didInsertElement').observes('storyModel.config.@each.value'),
    
    image_url: function(){
        return this.fetchEditableFieldValue('image_url');
    }.property('storyModel.config.@each.value'),
    
    link_url: function(){
        return this.fetchEditableFieldValue('link_url');
    }.property('storyModel.config.@each.value')
});
