/* global Ember, moment, _, $ */
import config from 'hebe-dash/config/environment';

export default Ember.Object.extend({
    dataMillCatAPI: '',
    dataMillDataAPI: '',
    hebeNodeAPI: '',
    bottomDrawerConfig: { test: 'test' },
    errorMessage: '',

    canvasSettings: {

    },

    solomonConfig: Ember.computed({
        get(){
            var hostname = window.location.hostname;
            // Lets you simulate another app (see config/envoronment)
            if(!Ember.isEmpty(this.get('mockSolomonHostname'))) {
                hostname = this.get('mockSolomonHostname');
            }
            var solomonConfig = {
                name: 'solomon',
                title: 'Solomon',
                defaultCanvas: 'leeds-city-council',
                tutorialBase: 'solomon_core',
                logoType: 'svg', // svg or bitmap
                storyConfig: {
                    storyHandle: 'dot' // can be 'dot', 'bar', 'both' or 'none,
                }
            };

            // overide app settings based on current hostname
            switch (hostname) {
                case 'leeds.testing.mysolomon.co.uk':
                case 'leeds.preview.mysolomon.co.uk':
                case 'leeds.mysolomon.co.uk':
                case 'dashboard.leedsdatamill.org':
                    solomonConfig.name = 'lcd';
                    solomonConfig.title = 'Leeds City Dashboard';
                    solomonConfig.tutorialBase = 'solomon_leeds';
                    break;
                case 'yorkshirewater.mysolomon.co.uk' :
                case 'mysolomon-yorkshirewater-preview.azurewebsites.net' :
                    solomonConfig.name = 'yorkshire-water';
                    solomonConfig.title = 'Yorkshire Water';
                    solomonConfig.storyConfig.storyHandle = 'both';
                    solomonConfig.defaultCanvas = 'contact-data';
                    solomonConfig.initMethod = this.ywInit;
                    // function() {
                    //     this.loadYWZones();
                    //     this.loadDMAs();
                    // };
                    break;
                case 'findmybinday.co.uk' :
                case 'findmybinday.com' :
                    solomonConfig.defaultCanvas = 'find-my-bin-day';
                    break;
                case 'york.mysolomon.co.uk' :
                    solomonConfig.defaultCanvas = 'york-home';
                    break;
                case 'nhsrtt.preview.mysolomon.co.uk':
                    solomonConfig.name = 'nhs';
                    solomonConfig.defaultCanvas = 'rtt-overview';
                    solomonConfig.title = 'NHS Dashboard';
                    solomonConfig.storyConfig.storyHandle = 'both';
                    solomonConfig.logoType = 'bitmap';
                    solomonConfig.initMethod = this.nhsInit;
                    break;
                case 'solomonbid.azurewebsites.net':
                case 'bid.mysolomon.co.uk':
                case 'bid.preview.mysolomon.co.uk':
                    solomonConfig.name = 'bid';
                    solomonConfig.title = 'Business Improvement District';
                    solomonConfig.storyConfig.storyHandle = 'both';
                    solomonConfig.defaultCanvas = 'bid-team-home'; // TODO switch based on user role e.g. bid user / levy payer                    
                    break;
                case 'binnovation.mysolomon.co.uk':
                case 'binnovation.preview.mysolomon.co.uk':
                    solomonConfig.name = 'binnovation';
                    solomonConfig.title = 'Binnovation';
                    solomonConfig.storyConfig.storyHandle = 'both';
            }
            return solomonConfig;
    }}),

    encodeQuery: function (query) {
        var json = JSON.stringify(query);
        var base64 = hebeutils.Base64.encode(json);
        return base64;
    },

    init: function () {
        this.set('dataMillCatAPI', config.APP.dataMillCatAPI.ensureNoEndingString('/'));
        this.set('dataMillDataAPI', config.APP.dataMillDataAPI.ensureNoEndingString('/'));
        this.set('hebeNodeAPI', config.APP.hebeNodeAPI.ensureNoEndingString('/'));
        this.set('mockSolomonHostname', config.APP.mockSolomonHostname);

        if(!Ember.isEmpty(this.get('solomonConfig'))) {
            var solomonInit = this.get('solomonConfig.initMethod');
            var target = this;
            if(_.isFunction(solomonInit)) {
                solomonInit.call(this);
            }
        }
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

/////////////////////////////////////////////////////////////////
// NHS Canvas Filtering
/////////////////////////////////////////////////////////////////
    nhsInit: function() {
        this.canvasSettings.nhsFilter = {
            "regions" : [],
            "selectedRegion" : null,
            "providers": [],
            "selectedProvider": null,
            "ccgs": [],
            "selectedCCG": null,
            "treatments": [],
            "months": [],
            "selectedMonth": null,
            "history" : [],
            "initialDataLoads" : 0
        };
        this.loadNHSRegions();
        this.loadNHSMonths();
        this.loadNHSTreatments();
    },
    loadNHSMonths: function() {
        var dateFormat = "MMM YYYY";
        var months = [
            { id: "20140331", text: moment("20140331","YYYYMMDD").format(dateFormat)},
            { id: "20140430", text: moment("20140430","YYYYMMDD").format(dateFormat)},
            { id: "20140531", text: moment("20140531","YYYYMMDD").format(dateFormat)},
            { id: "20140630", text: moment("20140630","YYYYMMDD").format(dateFormat)},
            { id: "20140731", text: moment("20140731","YYYYMMDD").format(dateFormat)},
            { id: "20140831", text: moment("20140831","YYYYMMDD").format(dateFormat)},
            { id: "20140930", text: moment("20140930","YYYYMMDD").format(dateFormat)},
            { id: "20141031", text: moment("20141031","YYYYMMDD").format(dateFormat)},
            { id: "20141130", text: moment("20141130","YYYYMMDD").format(dateFormat)},
            { id: "20141231", text: moment("20141231","YYYYMMDD").format(dateFormat)},
            { id: "20150131", text: moment("20150131","YYYYMMDD").format(dateFormat)},
            { id: "20150228", text: moment("20150228","YYYYMMDD").format(dateFormat)},
            { id: "20150331", text: moment("20150331","YYYYMMDD").format(dateFormat)},
            { id: "20150430", text: moment("20150430","YYYYMMDD").format(dateFormat)},
            { id: "20150531", text: moment("20150531","YYYYMMDD").format(dateFormat)},
            { id: "20150630", text: moment("20150630","YYYYMMDD").format(dateFormat)},
            { id: "20150731", text: moment("20150731","YYYYMMDD").format(dateFormat)},
            { id: "20150831", text: moment("20150831","YYYYMMDD").format(dateFormat)},
            { id: "20150930", text: moment("20150930","YYYYMMDD").format(dateFormat)},
            { id: "20151031", text: moment("20151031","YYYYMMDD").format(dateFormat)},
            { id: "20151130", text: moment("20151130","YYYYMMDD").format(dateFormat)}
        ];
        months.reverse();
        this.set('canvasSettings.nhsFilter.months',months);
        this.set('canvasSettings.nhsFilter.selectedMonth',months[0]);
    },
    loadNHSRegions: function () {
        var _this = this;
        var url = this.get('hebeNodeAPI') + '/nhsrtt/regions';
        this.getData(url, true).then(function (regions) {
            if (!Ember.isEmpty(regions)) {
                regions.forEach(function (region) {
                    region.id = region._id;
                    region.text = region.name;
                });
            }
            // regions.push({ id: 'all', text: 'All - May be slow' });
            _this.incrementProperty('canvasSettings.nhsFilter.initialDataLoads');
            _this.set('canvasSettings.nhsFilter.regions', regions);
            _this.set('canvasSettings.nhsFilter.selectedRegion', regions[1]);
        });
    },
    loadNHSTreatments: function () {
        var _this = this;
        var url = this.get('hebeNodeAPI') + '/nhsrtt/treatments';
        this.getData(url, true).then(function (treatments) {
            if (!Ember.isEmpty(treatments)) {
                treatments.forEach(function (treatment) {
                    treatment.id = treatment._id;
                    treatment.text = treatment.name;
                });
            }
            _this.incrementProperty('canvasSettings.nhsFilter.initialDataLoads');
            _this.set('canvasSettings.nhsFilter.treatments', treatments);
        });
    },
    onNHSSelectedRegionChange: function(){
        var providers = this.get('canvasSettings.nhsFilter.selectedRegion.providers');
        var ccgs = this.get('canvasSettings.nhsFilter.selectedRegion.ccgs');
        if (!Ember.isEmpty(providers)) {
            providers.forEach(function (provider) {
                provider.id = provider._id;
                provider.text = provider.name;
            });
        }
        if (!Ember.isEmpty(ccgs)) {
            ccgs.forEach(function (ccg) {
                ccg.id = ccg._id;
                ccg.text = ccg.name;
            });
        }
        
        this.setProperties({
            'canvasSettings.nhsFilter.providers': providers,
            'canvasSettings.nhsFilter.ccgs': ccgs,
            'canvasSettings.nhsFilter.selectedProvider': null,
            'canvasSettings.nhsFilter.selectedCCG': null
        });
    }.observes('canvasSettings.nhsFilter.selectedRegion'), 
    
    onNHSSelectedProviderChange: function(){
        if(this.get('canvasSettings.nhsFilter.selectedProvider')) {
            this.set('canvasSettings.nhsFilter.selectedCCG',null);
        }
    }.observes('canvasSettings.nhsFilter.selectedProvider'), 
    onNHSSelectedCCGChange: function(){
        if(this.get('canvasSettings.nhsFilter.selectedCCG')) {
            this.set('canvasSettings.nhsFilter.selectedProvider',null);
        }
    }.observes('canvasSettings.nhsFilter.selectedCCG'), 

/////////////////////////////////////////////////////////////////
// End NHS Canvas Filtering
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// YW Canvas Filtering
/////////////////////////////////////////////////////////////////
    ywInit: function() {
        this.canvasSettings.ywFilter = {
            "zones" : [],
            "subZones" : [],
            "dmas" : [],
            "selectedZone" : null,
            "selectedSubZone" : null,
            "selectedDMA" : null,
            "searchTerm" : '',
            "startDate" : new Date("01/01/2015"),
            "endDate" : new Date(),
            "history" : [],
            "initialDataLoads" : 0
        }
        this.loadYWZones();
        this.loadDMAs();
    },
    
    loadYWZones: function () {
        var _this = this;
        var url = this.get('hebeNodeAPI') + '/yw-zones?distinctfield=waterSupplySystem&sortfield=waterSupplyZone';
        this.getData(url, true).then(function (data) {
            var zones = [{ id: 'all', text: 'All - May be slow' }];
            if (!Ember.isEmpty(data)) {
                data.forEach(function (zone) {
                    zones.push({ text: zone, id: zone });
                });
            }
            _this.incrementProperty('canvasSettings.ywFilter.initialDataLoads');
            _this.set('canvasSettings.ywFilter.zones', zones);
            _this.set('canvasSettings.ywFilter.selectedZone', zones[1]);
        });
    },

    loadSubZones: function () {
        var _this = this;
        var selectedZone = this.get('canvasSettings.ywFilter.selectedZone');
        if (!Ember.isEmpty(selectedZone)) {
            var query = this.encodeQuery({ waterSupplySystem: selectedZone.id });
            var url = this.get('hebeNodeAPI') + '/yw-zones?distinctfield=pressureManagementZone&sortfield=waterSupplyZone&query=' + query;
            this.getData(url, true).then(function (data) {
                var zones = [{ id: 'all', text: 'All' }];
                if (!Ember.isEmpty(data)) {
                    data.forEach(function (zone) {
                        zones.push({ text: zone, id: zone });
                    });
                }
                _this.incrementProperty('canvasSettings.ywFilter.initialDataLoads');
                _this.set('canvasSettings.ywFilter.subZones', zones);
                // _this.set('canvasSettings.ywFilter.selectedSubZone', zones[0]);
            });
        }
    }.observes('canvasSettings.ywFilter.selectedZone'),

    loadDMAs: function () {
        var _this = this;
        var url = this.get('hebeNodeAPI') + '/yw-zones?distinctfield=zoneRef&sortfield=zoneRef';
        this.getData(url, true).then(function (data) {
            var zones = [{ id: 'all', text: 'All' }];
            if (!Ember.isEmpty(data)) {
                data.forEach(function (zone) {
                    zones.push({ text: zone, id: zone });
                });
            }
            _this.incrementProperty('canvasSettings.ywFilter.initialDataLoads');
            _this.set('canvasSettings.ywFilter.dmas', zones);
            // _this.set('canvasSettings.ywFilter.selectedDMA', zones[0]);
        });
    },

    onYWSelectedHistoryChange: function () {
        var selectedHistory = this.get('canvasSettings.ywFilter.selectedHistory');
        if (!Ember.isEmpty(selectedHistory)) {
            this.setProperties({
                'canvasSettings.ywFilter.selectedZone': selectedHistory.selectedZone,
                'canvasSettings.ywFilter.selectedSubZone': selectedHistory.selectedSubZone,
                'canvasSettings.ywFilter.selectedDMA': selectedHistory.selectedDMA,
                'canvasSettings.ywFilter.startDate': selectedHistory.startDate,
                'canvasSettings.ywFilter.endDate': selectedHistory.endDate
            });
        }
    }.observes('canvasSettings.ywFilter.selectedHistory'),

    onYWSettingsChange: function () {
        var _this = this;
        var hasQuery = false;
        // Build the mongo query for current YW filters
        var ywQuery = { $and: [] };
        var queryTitle = '';

        // var initialDataLoads = this.get('canvasSettings.ywFilter.initialDataLoads');

        // if (initialDataLoads >= 3) {

            var selectedZone = this.get('canvasSettings.ywFilter.selectedZone');
            var selectedSubZone = this.get('canvasSettings.ywFilter.selectedSubZone');
            var selectedDMA = this.get('canvasSettings.ywFilter.selectedDMA');
            var startDate = this.get('canvasSettings.ywFilter.startDate');
            var endDate = this.get('canvasSettings.ywFilter.endDate');
		
            // Sub DMAS
            if (!Ember.isEmpty(selectedDMA) && selectedDMA.id != 'all') {
                queryTitle += selectedDMA.text;
                ywQuery.$and.push({ "dma": selectedDMA.id });
                hasQuery = true;
            }
            // Sub Production Zones
            else if (!Ember.isEmpty(selectedSubZone) && selectedSubZone.id != 'all') {
                queryTitle += selectedSubZone.text;
                ywQuery.$and.push({ "pressureManagementZone": selectedSubZone.id });
                hasQuery = true;
            }
            // Sub DMAS/Zones
            else if (!Ember.isEmpty(selectedZone) && selectedZone.id != 'all') {
                queryTitle += selectedZone.text;
                ywQuery.$and.push({ "waterSupplySystem": selectedZone.id });
                hasQuery = true;
            }
            // Start date
            if (!Ember.isEmpty(startDate)) {
                queryTitle += ': ' + moment(new Date(startDate)).format('DD/MM/YYYY');
                ywQuery.$and.push({ "creationDate": { $gte: new Date(startDate) } });
                hasQuery = true;
            }
            // End date
            if (!Ember.isEmpty(endDate)) {
                queryTitle += ' - ' + moment(new Date(endDate)).format('DD/MM/YYYY');
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
                    selectedSubZone: selectedSubZone,
                    selectedDMA: selectedDMA,
                    startDate: startDate,
                    endDate: endDate,
                    ywQuery: ywQuery
                });

                if (!Ember.isEmpty(history)) {
                    var foundIndex = -1;
                    for (var i = 0; i < history.length; i++) {
                        var item = history[i];
                        if (JSON.stringify(item.ywQuery) == JSON.stringify(historyItem.ywQuery)) {
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
        // }
    }.observes(
        'canvasSettings.ywFilter.selectedZone',
        'canvasSettings.ywFilter.selectedSubZone',
        'canvasSettings.ywFilter.selectedDMA',
        'canvasSettings.ywFilter.startDate',
        'canvasSettings.ywFilter.endDate'),

    onSelectedZoneChanged: function () {
        if(!Ember.isEmpty(this.get('canvasSettings.ywFilter.selectedZone'))) {
            this.set('canvasSettings.ywFilter.selectedSubZone', null);
            this.set('canvasSettings.ywFilter.selectedDMA', null);
        }
    }.observes('canvasSettings.ywFilter.selectedZone'),

    onSelectedSubZoneChanged: function () {
        if(!Ember.isEmpty(this.get('canvasSettings.ywFilter.selectedSubZone'))) {
            this.set('canvasSettings.ywFilter.selectedDMA', null);
        }
    }.observes('canvasSettings.ywFilter.selectedSubZone'),

    onSelectedDMAChanged: function () {
        if(!Ember.isEmpty(this.get('canvasSettings.ywFilter.selectedDMA'))) {
            this.set('canvasSettings.ywFilter.selectedSubZone', null);
            this.set('canvasSettings.ywFilter.selectedZone', null);            
        }
    }.observes('canvasSettings.ywFilter.selectedDMA'),


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
                if (Ember.isEmpty(data)) {
                    _this.set('errorMessage', 'Sorry there is no data for this query');
                }
            });
    }.observes('canvasSettings.ywFilter.query'),
/////////////////////////////////////////////////////////////////
// End YW Canvas Filtering
/////////////////////////////////////////////////////////////////

    moveArray: function (arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    },

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

    getGoogleMapStyles: function (style) {
        var styles = {
            "default": [
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
            ],

            "yorkshireWater" : [
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
            ]
        };
        
        if(Ember.isEmpty(style) || Ember.isEmpty(styles[style])) {
           style = 'default'; 
        }
        return styles[style];
    }
});
