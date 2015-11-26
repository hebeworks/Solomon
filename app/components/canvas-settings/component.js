import Ember from 'ember';

export default Ember.Component.extend({
	zones: [],
	selectedZone: null,
	searchTerm: '',
	onInit: function(){
		var zone = this.get('zones');
		for(var i = 1; i <= 50; i ++) {
			zone.push({text:'Zone ' + i, id: i});
		}
	}.on('init'),
});
