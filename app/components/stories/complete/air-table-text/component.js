/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        height: '1', // (Set the height of the story)
        scroll: true, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    loaded: false, // (Tell other elements that this story has loaded)
    content: null,
    
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
    
    setContent: function() {
        var content = 'Proin at nulla luctus leo rhoncus mollis. Ut lacinia massa ullamcorper nibh volutpat sollicitudin. Donec maximus dolor sit amet nulla rutrum, vel pellentesque magna aliquet. Integer pellentesque quam eget tempus blandit. Nam eget vestibulum.'
        
        this.set('storyConfig.title', 'Comments');
        this.set('content', content);
    }.observes('loaded')
});
