/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Public Access Free WiFi', // (Provide a story title)
        subTitle: 'Concentration of free public WiFi locations in Leeds',
        author: 'Simon Zimmerman', // (Provide the author of the story)
        
        description: 'A heatmap showing the concentration of free public WiFi in Leeds',
        feedbackEmail: '',
        dataSourceUrl: 'http://leedsdatamill.org/dataset/edit/public-access-free-wifi',
        
        width: '3', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        
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
        var _this = this;            
        this.getData('http://api.datapress.io/api/3/action/datastore_search?resource_id=69818bbb-9a84-4f09-85ff-bd92842cc698')
            .then(function (data) {
                var locations = [];
                
                data.result.records.forEach(function (item) {
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
