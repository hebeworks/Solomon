/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    ragRating: '-lime', // -lime (green), -yellow (amber), -red (red)
    tileShade: 'light',
    
    didInsertElement: function() {
        
    }
});
