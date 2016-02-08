/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    onInsertElement: function () {
        
    }.on('didInsertElement')
});
