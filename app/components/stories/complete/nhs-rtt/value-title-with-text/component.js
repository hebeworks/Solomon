/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: '',
        subTitle: '',
        height: '1',
        scroll: false,
        viewOnly: true
    },
    loaded: true,

    editableFields: Ember.computed('storyModel', {
        get() {
            return [
                {
                    name:"title",
                    type:"markdown",
                    value:'',
                    placeholder:'Enter your title using markdown'
                },
                {
                    name: 'content',
                    type:'markdown',
                    value:'',
                    placeholder:'Enter your content using markdown'
                },
                {
                    name: 'trend',
                    type:'text',
                    value:'',
                    placeholder:'Enter either "up" "down" or "even"'
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
    
    trend: Ember.computed('storyModel.config.@each.value',{
        get() {
            return this.fetchEditableFieldValue('trend');
        }
    })

});
