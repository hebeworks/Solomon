/* global Ember, hebeutils, _ */
import DataMillStory from './../../story-types/datamill-story/component';
//https://duncan99.wordpress.com/2015/01/22/animated-paths-with-google-maps/
export default DataMillStory.extend({
    initialConfig: {
        title: 'Eagle Weather Balloon Flight Data',
        subTitle: 'Subtitle',
    },
    
    data: null,

    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),

    loadData: function () {

        function initialize() {
            var map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: pathCoords[0].lat, lng: pathCoords[0].lng },
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            autoRefresh(map);
        }
        function moveMarker(map, marker, latlng) {
            marker.setPosition(latlng);
            map.panTo(latlng);
        }
        function autoRefresh(map) {
            var i, route, marker;

            route = new google.maps.Polyline({
                path: [],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                editable: false,
                map: map
            });

            marker = new google.maps.Marker({ map: map, icon: "http://maps.google.com/mapfiles/ms/micons/blue.png" });
            for (i = 0; i < pathCoords.length; i++) {
                setTimeout(function (coords) {
                    var latlng = new google.maps.LatLng(coords.lat, coords.lng);
                    route.getPath().push(latlng);
                    moveMarker(map, marker, latlng);
                }, 200 * i, pathCoords[i]);
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        var pathCoords = [
            {
                "lat": 8.893260000000001,
                "lng": 76.61427
            },
            {
                "lat": 8.894430000000002,
                "lng": 76.61418
            },
        ];

    }


});
