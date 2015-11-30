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
		endDate: new Date("01/31/2015"),
	},

	init: function () {

		this.set('dataMillCatAPI', config.APP.dataMillCatAPI.ensureNoEndingString('/'));
		this.set('dataMillDataAPI', config.APP.dataMillDataAPI.ensureNoEndingString('/'));
		this.set('hebeNodeAPI', config.APP.hebeNodeAPI.ensureNoEndingString('/'));
	}

})
