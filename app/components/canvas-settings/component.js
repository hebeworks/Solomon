/* global Ember, moment, hebeutils, _ */
import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	appController: null,
	canvasSettings: Ember.computed.alias('appSettings.canvasSettings'),

	onDidReceiveAttrs: function () {
		// var startDate = new Date(2015,1,1);
		// var endDate = new Date(2015,1,31);
		// this.set('appController.canvasSettings',
		// 	{
		// 		zones: [],
		// 		selectedZone: null,
		// 		searchTerm: '',
		// 		startDate: startDate, // moment(new Date()).subtract('month', 1).toDate(),
		// 		endDate: endDate,
		// 	});
		// this.loadZones();
	}.on('didReceiveAttrs'),

	// NOT REQUIRED WITH THE NEW CONTACT DATA FORMAT
	// RATHER THAN GETTING A LIST OF INDIVIDUAL DMA CODES UNDER THE CHOSEN
	// WATER SYSTEM - WE CAN NOT QUERY CONTACTS DIRECTLY ON THE WATER SYSTEM
	// onSelectedZone: function () {
	// 	var _this = this;
	// 	var selectedZone = this.get('canvasSettings.selectedZone');
	// 	if (!Ember.isEmpty(selectedZone)) {
	// 		var uri = this.get('appSettings.hebeNodeAPI') + '/yw-zones?'
	// 			+ '&selectfields=ZONEREF'
	// 			+ '&query=' + this.get('solomonUtils').encodeQuery({ "Water Supply System": selectedZone.id })
	// 			;

	// 		this.getData(uri, true)
	// 			.then(function (data) {
	// 				var dmas = _.map(data, function (p) { return p.ZONEREF });
	// 				_this.set('canvasSettings.dmas', dmas);
	// 			});
	// 	}
	// }.observes('canvasSettings.selectedZone'),

	onYWSettingsChange: function () {
		// Build the mongo query for current YW filters
		var ywQuery = { $and: [] };
		// Sub DMAS/Zones
		var zoneID = this.get('canvasSettings.selectedZone.id');
		if (!Ember.isEmpty(zoneID)) {
			ywQuery.$and.push({ "waterSupplySystem": zoneID});
		}
		// // Start date
		// var startDate = this.get('canvasSettings.startDate');
		// if (!Ember.isEmpty(startDate)) {
		// 	ywQuery.$and.push({ "creationDate": { $gte: new Date(startDate) } });
		// }
		// // End date
		// var endDate = this.get('canvasSettings.endDate');
		// if (!Ember.isEmpty(endDate)) {
		// 	ywQuery.$and.push({ "creationDate": { $lte: new Date(endDate) } });
		// }
		this.set('canvasSettings.ywQuery', ywQuery);
	}.observes('canvasSettings.selectedZone', 'canvasSettings.startDate', 'canvasSettings.endDate'),

	loadYWQueryData: function () {
		var _this = this;
		var uri = this.get('appSettings.hebeNodeAPI')
			+ '/yw-contact-data?query='
            + this.get('solomonUtils').encodeQuery(this.get('canvasSettings.ywQuery'))
			+ '&limit=-1';

        this.getData(uri, true)
            .then(function (data) {
				console.log('Refreshed ywData' + data.length);
				_this.set('canvasSettings.ywData', data);
            });
	}.observes('canvasSettings.ywQuery')
});
