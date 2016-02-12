/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {

    storyConfig: {
        color: 'blue'
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
                type: 'text',
                value: '',
                placeholder: 'Description text'
            }
        ]
    }.property('storyModel.config'),

    title: function(){
        return this.fetchEditableFieldValue('title');
    }.property('storyModel.config.@each.value'),

    description: function(){
        return this.fetchEditableFieldValue('description');
    }.property('storyModel.config.@each.value')

});
