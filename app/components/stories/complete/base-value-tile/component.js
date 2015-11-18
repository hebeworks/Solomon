/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: 'white',
    tileValue: 'Value',
    tileDesc1: 'Description 1',
    tileDesc2: 'Description 2',
    tileShade: '',
    
    storyConfig: {
      width:'1',
      height:'1'  
    },
    
    didInsertElement: function() {
        
    }
});
