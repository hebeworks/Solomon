/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    ragRating: 'green', // red, amber or green
    ragValue: '4337',
    ragDesc1: 'Parking fines',
    ragDesc2: 'Issued this month',
    
    didInsertElement: function() {
        this.setRating();
    },
    
    setRating: function() {
        var obj = this;
        
        if (this.ragRating == 'green') {
            obj.set('ragRating', '-lime');
        } else if (this.ragRating == 'amber') {
            obj.set('ragRating', '-yellow');
        } else {
            obj.set('ragRating', '-red');
        }
    }
});
