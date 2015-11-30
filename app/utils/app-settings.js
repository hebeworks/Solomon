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
		startDate: moment(new Date()).subtract('month', 1).toDate(),
		endDate: new Date(),
	},
	
	init: function () {

		this.set('dataMillCatAPI', config.APP.dataMillCatAPI.ensureNoEndingString('/'));
		this.set('dataMillDataAPI', config.APP.dataMillDataAPI.ensureNoEndingString('/'));
		this.set('hebeNodeAPI', config.APP.hebeNodeAPI.ensureNoEndingString('/'));
	}

})
