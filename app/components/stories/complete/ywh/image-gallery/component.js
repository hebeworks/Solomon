/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        slider: true, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        width: 2,
        height: 2,
        viewOnly: true
    },
    
    didInsertElement: function() {
        var _this = this;
        
        setTimeout(function () {
            _this.set('loaded', true);
        });
    },
    
    images: [
        {url: 'assets/img/yorkshire-water/girl-brushing-teeth-310.jpg'},
        {url: 'assets/img/yorkshire-water/girl-body-boarding-310.jpg'},
        {url: 'assets/img/yorkshire-water/man-in-hard-hat-310.jpg'}
    ]
});
