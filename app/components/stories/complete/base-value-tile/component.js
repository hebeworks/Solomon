/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: '-white',
    tileValue: '4337',
    tileDesc1: 'Parking fines',
    tileDesc2: 'Issued this month',
    tileShade: '',
    
    didInsertElement: function() {
        
    }
});
