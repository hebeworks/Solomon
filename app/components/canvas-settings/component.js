import Ember from 'ember';

export default Ember.Component.extend({
	appController:null,
	canvasSettings: Ember.computed.alias('appSettings.canvasSettings'),

	onDidReceiveAttrs: function () {
		this.set('appController.canvasSettings',
			{
				zones: [],
				selectedZone: null,
				searchTerm: '',
				startDate: moment(new Date()).subtract('month', 1).toDate(),
				endDate: new Date(),
			});
		var zones = [];
		for (var i = 1; i <= 50; i++) {
			zones.push({ text: 'Zone ' + i, id: i });
		}
		this.set('canvasSettings.zones',zones);
	}.on('didReceiveAttrs'),
	
});
