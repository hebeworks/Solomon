/* global Ember, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
        title: 'Leeds Car Parks',
        subTitle: 'Registered spaces available in Leeds',
        color: 'blue',
        width: '2',
        height: '2',
        dataSourceUrl: 'http://leedsdatamill.org/dataset/live-car-park-spaces-api',
        feedbackEmail: 'info@leedsdatamill.org',
        description: "This Story used data from Leeds City Council's Live Car Park Spaces API",
        license: '<a href="http://leedsdatamill.org/dataset/live-car-park-spaces-api" target="_blank">Live car park spaces api</a>, © Leeds City Council, 2015. This information is licensed under the terms of the Open Government Licence',
        author: 'Nathan Smith'
    },

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
        
        var obj = this;
        // If we're on the BID app, change the story colour
        if (this.get('appSettings.solomonConfig.name') == 'bid') {
            obj.setProperties({
                'initialConfig.color': 'white',
                'initialConfig.author': '',
                'initialConfig.viewOnly': true
            });
        }
    }.on('init'),

    didInsertElement: function () {
        this.fetchData();
    },

    fetchData: function () {
        var obj = this;
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        this.getData(hebeNodeAPI + '/carparks')
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
            Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },

    currentCarPark: function () {
        if (this.get('items') != null) {
            return this.get('items').findBy('id', this.get('selectedCarPark'));
        }
        // Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
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
