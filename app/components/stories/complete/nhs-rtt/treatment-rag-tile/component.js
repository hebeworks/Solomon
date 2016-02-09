/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        width: '1', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '1', // (Set the height of the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    treatment: 'Trauma & Orthopaedics',
    value: 95.6,
    topValue: 97.43,
    lowValue: 87.2,
    valueHasDeviated: true,
    topHasChanged: false,
    lowHasChanged: false,
    topColour: 'black',
    lowColour: 'black',
    
    onInsertElement: function () {
        var _this = this;
        setTimeout(function() {
            _this.set('loaded', true);
        });
    }.on('didInsertElement'),
    
    updateTileApperance: function() {
        var _this = this;
        
        if (_this.valueHasDeviated == true) {
            // console.log('valueHasDeviated');
            _this.set('storyConfig.color', 'red');
            _this.set('topColour', 'white');
            _this.set('lowColour', 'white');
            _this.set('storyConfig.customProperties', 'has-deviated');
        }
        
        if (_this.topHasChanged == true) {
            // console.log('topHasChanged');
            _this.set('topColour', 'blue');
        }
        
        if (_this.lowHasChanged == true) {
            // console.log('lowHasChanged');
            _this.set('lowColour', 'red');
        }
    }.observes('loaded')
});
