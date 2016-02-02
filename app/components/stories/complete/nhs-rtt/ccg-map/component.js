/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'NHS England CCGs',
        subTitle: 'Choose a CCG',
        scroll: false
    },
    locations: [],
    gMap: null,
    gmapsLat: 53.7997,
    gmapsLng: -1.5492,
    gmapsZoom: 10,

    onInsertElement: function () {
        var _this = this;
        setTimeout(function () {
            var map = _this.get('gMap');
            // debugger;
            // map.setCenter({lat: 41.876, lng: -87.624});
    //         zoom: 11,
    // center: {lat: 41.876, lng: -87.624}
            var ctaLayer = new google.maps.KmlLayer({
                // url: 'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml',
                url: 'http://preview.mysolomon.co.uk/assets/CCG_BSC_Apr2015.kml',
                map: map.map
            });
        }, 1000);
    }.on('didInsertElement')
});
