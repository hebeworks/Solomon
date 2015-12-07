/* global Ember, moment, _, $ */
import config from 'hebe-dash/config/environment';

export default Ember.Object.extend({
    dataMillCatAPI: '',
    dataMillDataAPI: '',
    hebeNodeAPI: '',
    bottomDrawerConfig: { test: 'test' },

    canvasSettings: {
        ywFilter: {
            zones: [],
            selectedZone: null,
            searchTerm: '',
            startDate: new Date("01/01/2015"),
            endDate: new Date("06/30/2015"),
            history: []
        }
    },

    config: function (hostname) {
        // Temporary settings
        return {
            name: 'yorkshire-water',
            title: 'Yorkshire Water'
        };

        var solomonConfig = {};
        switch (hostname) {
            default:
                solomonConfig.name = 'solomon';
                solomonConfig.title = 'Solomon';
                break;
            case 'leeds.testing.mysolomon.co.uk':
            case 'leeds.preview.mysolomon.co.uk':
            case 'leeds.mysolomon.co.uk':
            case 'dashboard.leedsdatamill.org':
                solomonConfig.name = 'lcd';
                solomonConfig.title = 'Leeds City Dashboard';
                break;
        }
        return solomonConfig;
    },

    encodeQuery: function (query) {
        var json = JSON.stringify(query);
        var base64 = hebeutils.Base64.encode(json);
        return base64;
    },

    init: function () {
        this.set('dataMillCatAPI', config.APP.dataMillCatAPI.ensureNoEndingString('/'));
        this.set('dataMillDataAPI', config.APP.dataMillDataAPI.ensureNoEndingString('/'));
        this.set('hebeNodeAPI', config.APP.hebeNodeAPI.ensureNoEndingString('/'));

        this.loadYWZones();
    },

    getData: function (url, cache) {
        var obj = this;
        return new Ember.RSVP.Promise(function (resolve, reject, complete) {
            try {
                var useCache = (Ember.isEmpty(cache) || cache == true ? true : false); //(cache != null && cache === true ? true : false);
                $.support.cors = true;
                $.ajax({
                    url: url,
                    cache: useCache,
                    dataType: 'json',
                    crossOrigin: true,
                    type: 'GET',
                    // async: false //false, // must be set to false ?????? NS
                })
                    .done(resolve)
                    .fail(reject)
                    .always(complete);
                //Ember.$.ajax({
                //	url: url
                //})
                //.done(resolve)
                //.fail(reject)
                //.always(complete);
            }
            catch (err) {
                reject(err);
            }
            finally {
                if (complete != null) {
                    complete();
                }
            }
        });
    },

    loadYWZones: function () {
        var _this = this;
        var url = this.get('hebeNodeAPI') + '/yw-zones?distinctfield=waterSupplySystem&sortfield=waterSupplyZone';
        this.getData(url, true).then(function (data) {
            var zones = [];
            if (!Ember.isEmpty(data)) {
                data.forEach(function (zone) {
                    zones.push({ text: zone, id: zone });
                });
            }
            _this.set('canvasSettings.ywFilter.zones', zones);
            setTimeout(function () {
                _this.set('canvasSettings.ywFilter.selectedZone', _this.get('canvasSettings.ywFilter.zones.firstObject'));
            }, 1000);
        });
    },

    onYWSettingsChange: function () {
        var hasQuery = false;
        // Build the mongo query for current YW filters
        var ywQuery = { $and: [] };
        var queryTitle = '';

        var selectedZone = this.get('canvasSettings.ywFilter.selectedZone');
        var startDate = this.get('canvasSettings.ywFilter.startDate');
        var endDate = this.get('canvasSettings.ywFilter.endDate');
		
        // Sub DMAS/Zones
        if (!Ember.isEmpty(selectedZone)) {
            queryTitle += selectedZone.text;
            ywQuery.$and.push({ "waterSupplySystem": selectedZone.id });
            hasQuery = true;
        }
        // Start date
        if (!Ember.isEmpty(startDate)) {
            queryTitle += ' - from ' + moment(new Date(startDate)).format('DD/MM/YYYY');
            ywQuery.$and.push({ "creationDate": { $gte: new Date(startDate) } });
            hasQuery = true;
        }
        // End date
        if (!Ember.isEmpty(endDate)) {
            queryTitle += ' to ' + moment(new Date(endDate)).format('DD/MM/YYYY');
            ywQuery.$and.push({ "creationDate": { $lte: new Date(endDate) } });
            hasQuery = true;
        }

        if (hasQuery) {
            this.set('canvasSettings.ywFilter.query', ywQuery);
            // check if this query is already in history
            var history = this.get('canvasSettings.ywFilter.history');
            var historyItem = Ember.Object.create({
                title: queryTitle,
                id: hebeutils.guid(),
                selectedZone: selectedZone,
                startDate: startDate,
                endDate: endDate
            });
            if (!Ember.isEmpty(history)) {
                var foundIndex = -1;
                for (var i = 0; i < history.length; i++) {
                    var item = history[i];
                    if (item.selectedZone.id == historyItem.selectedZone.id
                        && item.startDate == historyItem.startDate
                        && item.endDate == historyItem.endDate) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex > -1) {
                    // if it is - move to top
                    history = this.moveArray(history, foundIndex, 0);
                } else {
                    // if not - insert
                    history.unshift(historyItem);
                    // this.set('canvasSettings.ywFilter.history', history.concat([historyItem]));
                    this.set('canvasSettings.ywFilter.history', history);
                }
            } else {
                this.set('canvasSettings.ywFilter.history', [historyItem]);
            }
        }
    }.observes('canvasSettings.ywFilter.selectedZone', 'canvasSettings.ywFilter.startDate', 'canvasSettings.ywFilter.endDate'),

    moveArray: function (arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    },

    loadYWQueryData: function () {
        var _this = this;
        var uri = this.get('hebeNodeAPI')
            + '/yw-contact-data?query='
            + this.encodeQuery(this.get('canvasSettings.ywFilter.query'))
            + '&limit=-1';

        this.getData(uri)
            .then(function (data) {
                console.log('Refreshed ywData' + data.length);
                _this.set('canvasSettings.ywFilter.data', data);
            });
    }.observes('canvasSettings.ywFilter.query'),

    groupSortCount: function (arr, prop, count, desc) {
        var grouped = _.groupBy(arr, function (obj) {
            return obj[prop];
        });
        var items = [];
        for (var key in grouped) {
            if (grouped.hasOwnProperty(key)) {
                var element = grouped[key];
                items.push({
                    groupKey: key,
                    count: element.length,
                    items: element
                });
            }
        }
        items = _.sortBy(items, function (obj) { return obj.count; });
        if (Ember.isEmpty(desc) || desc != true) {
            items.reverse();
        }
        if (!Ember.isEmpty(count) && !isNaN(count)) {
            items.splice(count);
        }

        for (var i = 0; i < items.length; i++) {
            items[i].index = i;
            items[i].position = (i + 1);
        }

        return items;
    },

    setGoogleMapStyles: function (style) {
        var defaultStyles = [
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

        var yorkshireWaterStyles = [
            {
                featureType: "all",
                stylers: [
                    {
                        saturation: 0
                    },
                    {
                        hue: "#c0d3d4"
                    }
                ]
            },
            {
                featureType: "road",
                stylers: [
                    {
                        saturation: -70
                    }
                ]
            },
            {
                featureType: "transit",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "poi",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "water",
                stylers: [
                    {
                        visibility: "simplified"
                    },
                    {
                        saturation: -40
                    }
                ]
            }
        ];

        if (style && style == 'yorkshire-water') {
            return yorkshireWaterStyles;
        } else if (style && style == 'default') {
            return defaultStyles;
        } else {
            return defaultStyles;
        }
    }

});
