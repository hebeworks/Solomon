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
        var kmlUrl = 'http://preview.mysolomon.co.uk/assets/CCG_BSC_Apr2015.kml';
        setTimeout(function () {
            var map = _this.get('gMap');

            var kmlLayer = new google.maps.KmlLayer({
                url: kmlUrl,
                suppressInfoWindows: true,
                map: map.map,
                clickable: true
            });

            kmlLayer.addListener('click', function (kmlEvent) {
                var text = kmlEvent.featureData.name;
                showInContentWindow(text);
            });

            function showInContentWindow(text) {
                alert(text);
                // var sidediv = document.getElementById('content-window');
                // sidediv.innerHTML = text;
            }
        }, 1000);
    }.on('didInsertElement')
});
