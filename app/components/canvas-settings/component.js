/* global Ember, moment, hebeutils, _ */
import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	appController: null,
	ywFilter: Ember.computed.alias('appSettings.canvasSettings.ywFilter'),

	history: Ember.computed.alias('ywFilter.history'),
	selectedHistory: null,
	onSelectedHistoryChange: function () {
		var selectedHistory = this.get('selectedHistory');
		alert(selectedHistory);
	}.observes('selectedHistory'),

	onCSInit: function () {
		this.get('history');
		this.get('selectedHistory');
		
	}.on('init'),

	onSelectedHistory: function () {
		var selectedHistory = this.get('selectedHistory');
		if (!Ember.isEmpty(selectedHistory)) {
			this.setProperties({
					'ywFilter.selectedZone': selectedHistory.selectedZone,
					'ywFilter.startDate': selectedHistory.startDate,
					'ywFilter.endDate': selectedHistory.endDate
				});
		}
	}.observes('selectedHistory')

});
