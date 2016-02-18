/* global Ember, hebeutils, _ */
import DefaultStory from './../../../story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
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
            var mapStyles = this.get('appSettings').getGoogleMapStyles('yorkshireWater');
            this.get('gMap').setOptions({ styles: mapStyles });
        }
    }.observes('gMap'),

    onHeatMapAttrs: function () {
        this.loadDataOntoMap();
    }.on('init'),
    
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
                itemCount = 0;

            for (var i = 0; i < ywData.length; i++) {
                var item = ywData[i];

                if (!isNaN(item.lat) && !isNaN(item.lon)
                    && !Ember.isEmpty(item.lat) && !Ember.isEmpty(item.lon)) {
                    mapLng += item.lon;
                    mapLat += item.lat;
                    itemCount++;
                    contacts.push([item.lat, item.lon]);
                }
            }

            var finalMapLat = mapLat / itemCount,
                finalMapLng = mapLng / itemCount;

            _this.setProperties({
                gmapsLat: finalMapLat,
                gmapsLng: finalMapLng,
                gmapsHeatmapMarkers: contacts
            });

            console.log('Heat Map contacts:' + this.get('gmapsHeatmapMarkers.length') + ', gmapsLat:' + this.get('gmapsLat') + ', gmapsLng: ' + this.get('gmapsLng'));

            setTimeout(function () {
                _this.set('loaded', true);
            });
        }
    }.observes('ywData'),

});
