/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    ragRating: '-lime', // -lime (green), -yellow (amber), -red
    ragValue: '4337',
    ragDesc1: 'Parking fines',
    ragDesc2: 'Issued this month',
    
    didInsertElement: function() {
        
    }
});
