/* global Ember, moment, hebeutils */
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
		var url = 'http://hebenodeapi-testing.azurewebsites.net/yw-zones?distinctfield=Water Supply System';
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
			var uri = 'http://hebenodeapi-testing.azurewebsites.net/yw-zones?'
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

});
