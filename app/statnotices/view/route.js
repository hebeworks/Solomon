import Ember from 'ember';

export default Ember.Route.extend({
	activate: function(){
		// set parent route's (statnotices) controller
			// 	galleryNavItems = 
	},
	model: function (params) {
		if (params != null && params.statnotice_id != null) {
			return this.store.find('statnotice', params.statnotice_id);
		} else {
			return null;
		}
	}
});
