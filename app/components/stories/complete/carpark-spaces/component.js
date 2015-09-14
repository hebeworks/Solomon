/* global Ember, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({

    tagName: 'div',
    loaded: false,
    selectedCarPark: null,

    setup: function () {
        this.setProperties({
            lat: 53.801277,
            lng: -1.548567,
            zoom: 12,
            markers: Ember.A([]),
            selectedCarPark: null
        });
    }.on('init'),

    didInsertElement: function () {
        this.set('title', 'Leeds Car Parks');
        this.set('subTitle', 'Registered spaces available in Leeds');
        this.fetchData();
    },

    fetchData: function () {
        var obj = this;
        this.getData('http://hebenodeapi.azurewebsites.net/carparks')
            .then(function (data) {
            var carParks = [];
            data.results.forEach(function (item) {
                var carPark = {};
                carPark.id = item["carParkIdentity"]
                    .substr(item["carParkIdentity"].indexOf(':') + 1,
                    (item["carParkIdentity"].length - item["carParkIdentity"].indexOf(':')) - 1);
                carPark.title = item["carParkIdentity"].substr(0, item["carParkIdentity"].indexOf(':'));
                carPark.lat = item["groupOfLocations"][0].latitude[0];
                carPark.lng = item["groupOfLocations"][0].longitude[0];
                carPark.occupiedSpaces = item["occupiedSpaces"];
                carPark.totalCapacity = item["totalCapacity"];
                carPark.available = carPark.totalCapacity - carPark.occupiedSpaces;
                carParks.push(carPark);
            });

            carParks = _.sortBy(carParks, 'title');

            obj.set('items', carParks);
            obj.set('selectedCarPark', carParks[0].id);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },

    currentCarPark: function () {
        if (this.get('items') != null) {
            return this.get('items').findBy('id', this.get('selectedCarPark'));
        }
    }.property('selectedCarPark'),

    setupMarkers: function () {
        var selectedCarPark = this.get('items').findBy('id',this.get('selectedCarPark'));
        if (selectedCarPark != null) {
            var markers = Ember.A([
                { 
                    title: selectedCarPark.street, 
                    lat: selectedCarPark.lat, 
                    lng: selectedCarPark.lng, 
                    body: selectedCarPark.street }
                ]);
            this.set('lat', selectedCarPark.lat);
            this.set('lng', selectedCarPark.lng);
            this.set('markers', markers);
            this.set('zoom', 16);
        }
    }.observes('selectedCarPark'),


    mapStyles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#0c0b0b"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#090909"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#d4e4eb"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#fef7f7"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9b7f7f"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#fef7f7"
                }
            ]
        }
    ]
});
