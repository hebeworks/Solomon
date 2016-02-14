/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    initialConfig: {
        title: 'TITLE: <%= dasherizedModuleName %>',
        subTitle: 'SUBTITLE: <%= dasherizedModuleName %>',
        color: 'white',
        width: '2',
        height: '2',
        scroll: true,
    },
    loaded: true,
    editableFields: Ember.computed('storyModel', {
        get() {
            return [
                {
                    name: "title",
                    type: "text",
                    value: '',
                    placeholder: 'Enter your title'
                },
                {
                    name: 'content',
                    type: 'markdown',
                    value: '',
                    placeholder: 'Enter your content using markdown'
                },
                {
                    name: 'story_colour',
                    type: 'enum',
                sourceContent: JSON.stringify([{ text: 'white', id: 'white' }, { text: 'medium-blue', id: 'medium-blue' }]),
                    value: '',
                    placeholder: 'Choose a story colour'
                }
            ];
        }
    }),
    
    title: Ember.computed('storyModel.config.@each.value', {
        get() {
            return this.fetchEditableFieldValue('title');
        }
    }),

    content: Ember.computed('storyModel.config.@each.value', {
        get() {
            return this.fetchEditableFieldValue('content');
        }
    }),
    
    onColourChanged: function () {
        var colour = this.fetchEditableFieldValue('story_colour');
        if (!Ember.isEmpty(colour)) {
            this.set('storyConfig.color', colour);
        }
    }.on('didReceiveAttrs').observes('storyModel.config.@each.value'),


});
