/* global Ember, moment, _, $ */
import config from 'hebe-dash/config/environment';

export default Ember.Object.extend({
	dataMillCatAPI: '',
	dataMillDataAPI: '',
	hebeNodeAPI: '',
	bottomDrawerConfig: { test: 'test' },

	canvasSettings: {
		zones: [],
		selectedZone: null,
		searchTerm: '',
		startDate: new Date("01/01/2015"),
		endDate: new Date("06/30/2015"),
	},

	config: function (hostname) {
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
				var useCache = (cache != null && cache === true ? true : false);
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
			_this.set('canvasSettings.zones', zones);
			setTimeout(function () {
				_this.set('canvasSettings.selectedZone', _this.get('canvasSettings.zones.firstObject'));
			}, 1000);
		});
	},

	onYWSettingsChange: function () {
		var hasQuery = false;
		// Build the mongo query for current YW filters
		var ywQuery = { $and: [] };
		// Sub DMAS/Zones
		var zoneID = this.get('canvasSettings.selectedZone.id');
		if (!Ember.isEmpty(zoneID)) {
			ywQuery.$and.push({ "waterSupplySystem": zoneID });
			hasQuery = true;
		}
		// // Start date
		// var startDate = this.get('canvasSettings.startDate');
		// if (!Ember.isEmpty(startDate)) {
		// 	ywQuery.$and.push({ "creationDate": { $gte: new Date(startDate) } });
			// hasQuery = true;
		// }
		// // End date
		// var endDate = this.get('canvasSettings.endDate');
		// if (!Ember.isEmpty(endDate)) {
		// 	ywQuery.$and.push({ "creationDate": { $lte: new Date(endDate) } });
			// hasQuery = true;
		// }
		if(hasQuery) {
			this.set('canvasSettings.ywQuery', ywQuery);
		}
	}.observes('canvasSettings.selectedZone', 'canvasSettings.startDate', 'canvasSettings.endDate'),

	loadYWQueryData: function () {
		var _this = this;
		var uri = this.get('hebeNodeAPI')
			+ '/yw-contact-data?query='
            + this.encodeQuery(this.get('canvasSettings.ywQuery'))
			+ '&limit=-1';

        this.getData(uri, true)
            .then(function (data) {
				console.log('Refreshed ywData' + data.length);
				_this.set('canvasSettings.ywData', data);
            });
	}.observes('canvasSettings.ywQuery'),

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
    }


});
