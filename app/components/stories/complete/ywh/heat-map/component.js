/* global Ember, hebeutils, _ */
import DefaultStory from './../../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'Concentration of Contacts', // (Provide a story title)
        subTitle: 'Heatmap of customer contacts for chosen DMA', // (Provide a story subtitle)
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
    
    // Map settings
    gmapsLat: 0,
    gmapsLng: 0,
    gmapsZoom: 13,
    gmapsRadius: 20,
    gmapsOpacity: 0.4,
    gmapsHeatmapDissipating: true,
    gmapsHeatmapMarkers: [],
    
    onDidInsertElement: function(){
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('hebeNodeAPI'),
            storyData = 'yw-contact-data?query=eyJETUEiOiJHMDg5In0=&limit=-1';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var contacts = [],
                    mapLat = 0,
                    mapLng = 0,
                    itemCount = 0;
                
                data.forEach(function (item) {
                    mapLat = mapLat + item.lat;
                    mapLng = mapLng + item.lng;
                    itemCount = itemCount + 1;

                    contacts.push([
                        item.lat,
                        item.lng
                    ]);
                });
                
                var finalMapLat = mapLat / itemCount,
                    finalMapLng = mapLng / itemCount;
                    
                _this.set('gmapsLat', finalMapLat);
                _this.set('gmapsLng', finalMapLng);
                _this.set('gmapsHeatmapMarkers', contacts);
                console.log(contacts);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            });
    },
    
    onZoneChanged: function(){
        // var canvasSettings = this.get('appSettings.canvasSettings');
        var selectedZone = this.get('appSettings.canvasSettings.selectedZone');
        
    }.observes('appSettings.canvasSettings.selectedZone'),
    
});
