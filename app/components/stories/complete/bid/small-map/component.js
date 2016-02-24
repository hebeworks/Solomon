/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Map', // (Provide a story title)
        subTitle: 'Some dynamic description for the map', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true,
        showHeaderBorder: false
    },
    
    onGMap: function () {
        var gMap = this.get('gMap');
        if (!Ember.isEmpty(gMap)) {
            var mapStyles = [
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
            ];
            this.get('gMap').setOptions({ styles: mapStyles });
        }
    }.observes('gMap'),
    
    lat: 53.7997,
    lng: -1.5492,
    zoom: 14,
    markers: Ember.A([
        {
            title: 'Boots Retail Store',
            lat: 53.7971882,
            lng: -1.5460526,
            icon: '/assets/img/svg/embed/bid-marker-orange-blue.svg'
        },
        {
            title: 'Boots Retail Store',
            lat: 53.7997,
            lng: -1.5492,
            icon: '/assets/img/svg/embed/bid-marker-orange-blue.svg'
        }
    ]),
    
    // loaded: false, // (Tell other elements that this story has loaded)
    //
    
    // Add your story-specific code here
    data: null,
    
    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),

    loadData: function () {
        var _this = this;
        var url = 'http://'; // add any API url that returns JSON
        this.getData()
            .then(
                function(data){
                    var items = data; // the JSON returned from the API call is available here
                    this.set('items',items); // set properties on the Ember component to make them available in the template
                    setTimeout(() => { _this.set('loaded', true); });
                },
                function(err){ console.log(err); }
            )
    }
});
