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
	// 			+ '&query=' + this.get('appSettings').encodeQuery({ "Water Supply System": selectedZone.id })
	// 			;

	// 		this.getData(uri, true)
	// 			.then(function (data) {
	// 				var dmas = _.map(data, function (p) { return p.ZONEREF });
	// 				_this.set('canvasSettings.dmas', dmas);
	// 			});
	// 	}
	// }.observes('canvasSettings.selectedZone'),


});
