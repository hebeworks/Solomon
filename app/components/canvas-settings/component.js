import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	appController:null,
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
			var url = 'http://hebenodeapi-testing.azurewebsites.net/yw-zones?selectfields=name';
			this.getData(url).then(function(data){
				var zones = [];
				if(!Ember.isEmpty(data)){
					data.forEach(function(zone){
						zones.push({ text: zone.name, id: zone._id });
					});				
				};
				_this.set('canvasSettings.zones',zones);
			});
	}.on('didReceiveAttrs'),
	
});
