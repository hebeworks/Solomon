/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: '',
        subTitle: '',
        width: '1',
        height: '1',
    },
    
    ragRating: 'lime', // lime (green), yellow (amber), -red (red)
    tileShade: 'light',
    
    // loaded: false, (Tell other elements that this story has loaded)

    

});
