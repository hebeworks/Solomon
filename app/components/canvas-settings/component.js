/* global Ember, moment, hebeutils, _ */
import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	appController: null,
	canvasSettings: Ember.computed.alias('appSettings.canvasSettings'),

	onDidReceiveAttrs: function () {
		var _this = this;
		this.set('appController.canvasSettings',
			{
				zones: [],
				selectedZone: null,
				searchTerm: '',
				startDate: moment(new Date()).subtract('month', 1).toDate(),
				endDate: new Date(),
			});
		var url = this.get('appSettings.hebeNodeAPI') + '/yw-zones?distinctfield=Water Supply System';
		// var url = 'http://hebenodeapi-testing.azurewebsites.net/yw-zones?distinctfield=Water Supply Zone';
		this.getData(url).then(function (data) {
			var zones = [];
			if (!Ember.isEmpty(data)) {
				data.forEach(function (zone) {
					zones.push({ text: zone, id: zone });
				});
			};
			_this.set('canvasSettings.zones', zones);
		});
	}.on('didReceiveAttrs'),

	onSelectedZone: function () {
		var _this = this;
		var selectedZone = this.get('canvasSettings.selectedZone');
		if (!Ember.isEmpty(selectedZone)) {
			var uri = this.get('appSettings.hebeNodeAPI') + '/yw-zones?'
				+ '&selectfields=ZONEREF'
				+ '&query=' + this.get('solomonUtils').encodeQuery({ "Water Supply System": selectedZone.id })
				;

			this.getData(uri)
				.then(function (data) {
					var dmas = _.map(data, function (p) { return p.ZONEREF });
					_this.set('canvasSettings.dmas',dmas);
				});
		}
	}.observes('canvasSettings.selectedZone'),
	
	onYWSettingsChange: function(){
		// Build the mongo query for current YW filters
		var ywQuery = {};
		// Sub DMAS/Zones
		var dmas = this.get('canvasSettings.dmas');
		if(!Ember.isEmpty(dmas)) {
			var dmaQuery = [];
			dmas.forEach(function (p) {
				dmaQuery.push({ "DMA": p });
			});
			ywQuery.$or = dmaQuery;
		}
		// Start date
		var startDate = this.get('canvasSettings.startDate');
		if(!Ember.isEmpty(startDate)) {
			ywQuery.$and = [{ "Creation Date": { $gte: new Date(startDate) } }];
		}
		this.set('canvasSettings.ywQuery',ywQuery);
	}.observes('canvasSettings.dmas','canvasSettings.startDate'),

});
