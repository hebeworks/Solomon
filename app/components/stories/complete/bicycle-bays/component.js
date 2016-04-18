/* global Ember, hebeutils */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    initialConfig: {
        title: 'Bicycle Bays in Leeds City Centre',
        subTitle: '',
        width: '2',
        height: '2',
        dataSourceUrl: 'http://leedsdatamill.org/dataset/leeds-city-centre-bike-bays',
        feedbackEmail: 'info@leedsdatamill.org',
        description: 'This Story used data from the City Centre Bike Bays dataset from Leeds Data Mill',
        license: '<a href="http://leedsdatamill.org/dataset/leeds-city-centre-bike-bays" target="_blank">Leeds City Centre bike bays</a>, © Leeds City Council, 2015. This information is licensed under the terms of the Open Government Licence',
        author: 'Nathan Smith',
        viewOnly: true,
        scroll: false,
        showHeaderBorder: false,
        showLoading: true
    },

    setup: function () {
        this.setProperties({
            lat: 53.801277,
            lng: -1.548567,
            zoom: 12,
            markers: Ember.A([]),
            selectedItem: null
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
        var obj = this;
        
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        this.getData(hebeNodeAPI + '/leeds-city-centre-bike-bays')
            .then(function (data) {
                var items = [];
                data.forEach((tmpItem) => {
                    var id = hebeutils.guid();
                    var item = {
                        id: id,
                        street: tmpItem.Street,
                        ward: tmpItem.Ward,
                        lat: (tmpItem.Lat == null ? tmpItem["Lat "] : tmpItem.Lat),
                        lng: tmpItem.Long,
                        type: tmpItem.Type,
                        colour: tmpItem.Colour
                    };

                    items.push(item);
                });
                obj.set('items', items);
                setTimeout(() => {
                    obj.set('loaded', true);
                });
            },
                function (error) {
                    // debugger;
                    console.log('ajax error:' + error);
                });
    },

    setupMarkers: function () {
        var item = this.get('selectedItem');
        if (item != null) {
            var markers = Ember.A([
                {
                    title: item.street,
                    lat: item.lat,
                    lng: item.lng,
                    body: item.street
                }
            ]);
            this.set('lat', item.lat);
            this.set('lng', item.lng);
            this.set('markers', markers);
            this.set('zoom', 16);
        }
    }.observes('selectedItem'),


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
