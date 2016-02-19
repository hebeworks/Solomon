/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Status', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        color: 'white', // (Set the story colour)
        width: '1', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '1', // (Set the height of the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    loaded: false, // (Tell other elements that this story has loaded)
    occupied: true,
    occupancyText: null,
    
    // Add your story-specific code here
    data: null,
    
    onInsertElement: function () {
        this.loadData();
        var _this = this;
        setTimeout(function() {
            _this.set('loaded', true);
        });
    }.on('didInsertElement'),

    loadData: function () {
        var _this = this;
        var url = 'http://'; // add any API url that returns JSON
        this.getData()
            .then(
                function(data){
                    var items = data; // the JSON returned from the API call is available here
                    this.set('items',items); // set properties on the Ember component to make them available in the template
                    setTimeout(() => { _this.set('loaded', true); });
                },
                function(err){ console.log(err); }
            )
    },
    
    setOccupancy: function() {
        if (this.get('occupied')) {
            this.set('storyConfig.color', 'green');
            this.set('occupancyText', 'Currently Occupied');
        } else {
            this.set('storyConfig.color', 'red');
            this.set('occupancyText', 'Currently Empty');
        }
    }.observes('loaded')
});
