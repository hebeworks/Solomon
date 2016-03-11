/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    initialConfig: {
        title: '',
        subTitle: '',
        scroll: false,
        viewOnly: true
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
                    name: 'description',
                    type: 'markdown',
                    value: '',
                    placeholder: 'Enter your description'
                },
                {
                    name: 'youtube_src',
                    type: 'text',
                    value: '',
                    placeholder: 'Enter your youtube ID'
                },
                {
                    name: 'youtube_channel',
                    type: 'text',
                    value: '',
                    placeholder: 'Enter your youtube channel'
                }
            ];
        }
    }),

    title: Ember.computed('storyModel.config.@each.value', {
        get() {
            return this.fetchEditableFieldValue('title');
        }
    }),

    description: Ember.computed('storyModel.config.@each.value', {
        get() {
            return this.fetchEditableFieldValue('description');
        }
    }),

    youtubeSrc: Ember.computed('storyModel.config.@each.value', {
        get() {
            var id = this.fetchEditableFieldValue('youtube_src');
            if (!Ember.isEmpty(id)) {
                return 'https://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0';
            }
        }
    }),

    userChannel: Ember.computed('storyModel.config.@each.value', {
        get() {
            var id = this.fetchEditableFieldValue('youtube_channel');
            if (!Ember.isEmpty(id)) {
                // return 'https://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0';
                return 'http://www.youtube.com/embed/?listType=user_uploads&list=' + id;
            }
        }
    }),
});
