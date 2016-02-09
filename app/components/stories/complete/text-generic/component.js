/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({

    // TODO: Syncing and persistence.

    storyConfig: {
        color: 'blue'
    },

    title: function(){
        return this.get('storyModel.config').findBy('name', 'title').get('value');
    }.property('storyModel.config.@each.value'),

    description: function(){
        return this.get('storyModel.config').findBy('name', 'description').get('value');
    }.property('storyModel.config.@each.value'),

    setupEditableConfiguration: function (){
        var story = this.get('storyModel');
        window.story = story;
        story.addConfigItem({ name: 'title', type: 'text', value: '', placeholder: 'Title text' });
        story.addConfigItem({ name: 'description', type: 'text', value: '', placeholder: 'Description text' });
    }.on('didInsertElement'),

    //
    // NOTE: This is a hack at the moment, discuss with Nate what he'd like to do.
    keepTitleInSync: function(){
        this.set('storyConfig.title', this.get('title'));
    }.on('didInsertElement').observes('title')

});
