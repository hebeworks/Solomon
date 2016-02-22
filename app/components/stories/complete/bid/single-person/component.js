/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Person', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        height: '1', // (Set the height of the story)
        viewOnly: true,
        showHeaderBorder: false
    },
    
    // loaded: false, // (Tell other elements that this story has loaded)
    //
    
    // Add your story-specific code here
    data: null,
    
    onInsertElement: function () {
        this.loadData();
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
    }
});
