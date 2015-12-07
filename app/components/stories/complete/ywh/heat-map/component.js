/* global Ember, hebeutils, _ */
import DefaultStory from './../../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'WQ Contacts Mapped by Zone', // (Provide a story title)
        subTitle: 'A heat map of customer contacts', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'light-blue', // (Set the story colour)
        width: '3', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false,
        viewOnly: true
    },

    onGMap: function () {
        var gMap = this.get('gMap');
        if (!Ember.isEmpty(gMap)) {
            var mapStyles = this.get('appSettings').setGoogleMapStyles('yorkshire-water');
            this.get('gMap').setOptions({ styles: mapStyles });
        }
    }.observes('gMap'),

    onHeatMapAttrs: function () {
        this.get('ywData');
    }.on('didReceiveAttrs'),
    
    // Map settings
    gmapsLat: 0,
    gmapsLng: 0,
    gmapsZoom: 10,
    gmapsRadius: 20,
    gmapsOpacity: 0.4,
    gmapsHeatmapDissipating: true,
    gmapsHeatmapMarkers: [],

    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    loadDataOntoMap: function () {
        var _this = this;
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var contacts = [],
                mapLat = 0,
                mapLng = 0,
                itemCount = ywData.length;

            contacts = _.map(ywData, function (item) {
                if (!isNaN(item.lat)) { mapLat += item.lat; }
                if (!isNaN(item.lon)) { mapLng += item.lon; }
                return [item.lat, item.lon];
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
        }
    }.observes('ywData'),
    
});
