/* global Ember, moment, _, $ */
export default Ember.Object.extend({
  bottomDrawerConfig: { test: 'test' },
  canvasSettings: {
	zones: [],
	selectedZone: null,
	searchTerm: '',
	startDate: moment(new Date()).subtract('month', 1).toDate(),
	endDate: new Date(),
  }
});