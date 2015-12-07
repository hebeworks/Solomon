/* global Ember, moment, hebeutils, _ */
import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	appController: null,
	ywFilter: Ember.computed.alias('appSettings.canvasSettings.ywFilter'),
	
	history: Ember.computed.alias('ywFilter.history'),
	selectedHistory:null,
	onSelectedHistoryChange: function(){
		var selectedHistory = this.get('selectedHistory');
		alert(selectedHistory);
	}.observes('selectedHistory'),
	
	onCSInit: function(){
		this.get('history');
		this.get('selectedHistory');
	}.on('init'),
	
	onSelectedHistory: function(){
		var selectedHistory = this.get('selectedHistory');
		debugger;
		if(!Ember.isEmpty(selectedHistory)) {
			this.get('ywFilter')
				.setProperties({
					selectedZone: selectedHistory.selectedZone,	
					startDate: selectedHistory.startDate,	
					endDate: selectedHistory.endDate	
				});
		}
	}.observes('selectedHistory')
	
});
