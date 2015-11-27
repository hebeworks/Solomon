/* global Ember, hebeutils, _ */
import DefaultStory from './../../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'TITLE: ywh/heat-map', // (Provide a story title)
        subTitle: 'SUBTITLE: ywh/heat-map', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false,
        viewOnly: true
    },
    
    // loaded: false, (Tell other elements that this story has loaded)
    //
    
    onDidInsertElement: function(){
        
    }.on('didInsertElement'),
    
    gmapsLat: 37.774546,
    gmapsLng: -122.433523,
    gmapsZoom: 13,
    gmapsRadius: 20,
    gmapsOpacity: 0.2,
    gmapsHeatmapDissipating: true,
    gmapsHeatmapMarkers: [
        [37.782, -122.447],
        [37.782, -122.445],
        [37.782, -122.443],
        [37.782, -122.441],
        [37.782, -122.439],
        [37.782, -122.437],
        [37.782, -122.435],
        [37.785, -122.447],
        [37.785, -122.445],
        [37.785, -122.443],
        [37.785, -122.441],
        [37.785, -122.439],
        [37.785, -122.437],
        [37.785, -122.435]
    ]
});
