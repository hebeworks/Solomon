/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    storyConfig: {
        title: 'TITLE: youtube-generic',
        subTitle: 'SUBTITLE: youtube-generic',
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
                    name:"title",
                    type:"text",
                    value:'',
                    placeholder:'Enter your title'
                },
                {
                    name: 'content',
                    type:'markdown',
                    value:'',
                    placeholder:'Enter your content using markdown'
                }
            ];
        }
    }),
    title: Ember.computed('storyModel.config.@each.value',{
        get() {
            return this.fetchEditableFieldValue('title');
        }
    }),
    
    content: Ember.computed('storyModel.config.@each.value',{
        get() {
            return this.fetchEditableFieldValue('content');
        }
    }),
});
