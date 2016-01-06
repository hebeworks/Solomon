/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Pedestrian Accident Locations', // (Provide a story title)
        subTitle: 'Concentrated locations of accidents involving pedestrians.', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        width: '3', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    locations: [],
    
    // Map settings
    gmapsLat: 53.7997,
    gmapsLng: -1.5492,
    gmapsZoom: 10,
    gmapsRadius: 20,
    gmapsOpacity: 0.4,
    gmapsHeatmapDissipating: true,
    gmapsHeatmapMarkers: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-mapped';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var locations = [];
                
                data.forEach(function (item) {
                    locations.push([
                        item.Latitude,
                        item.Longitude
                    ]);
                });
                
                _this.set('locations', locations);
                
                // console.log(_this.locations);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            });
    },
    
    loadMapData: function() {
        this.set('gmapsHeatmapMarkers', this.locations);
    }.observes('loaded')
});
