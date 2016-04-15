/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        height: '1', // (Set the height of the story)
        scroll: false, // (Should the story vertically scroll its content?)
        showLoading: true
    },
    
    primaryMessage: null,
    secondaryMessage: null,
    
    onInsertElement: function() {
        const _this = this;
        
        setTimeout(function() {
            _this.set('loaded', true);
            _this.set('primaryMessage', 'You are recyling 6% more than when we started');
            _this.set('secondaryMessage', 'We will save the rainforest in no time... Keep it up');
        });
    }.on('didInsertElement')
});
