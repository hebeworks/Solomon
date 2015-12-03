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
			setTimeout(function() {
				_this.set('canvasSettings.selectedZone', _this.get('zones.firstObject'));
			}, 1000);
		});
	},

})
