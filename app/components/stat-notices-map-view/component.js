import Ember from 'ember';

export default Ember.Component.extend({
	// locations: [
	// 	{ title: "Home", lat: 14.766127, lng: 102.810987, body: "Here is B&H's home" },
	// 	{ title: "Shop", lat: 14.762963, lng: 102.812285, body: "Here is B&H's shop", isInfoWindowVisible: true },
	// 	{ title: "Hay's", lat: 14.762900, lng: 102.812018, body: "Here is Hay's shop" }
    // ],

	markers: Ember.computed('items', {
		get() {
			var items = this.get('items').get('content');
			// return _.map(items.slice(0,10), function (obj) {
			return _.map(items, function (obj) {
				var item = obj.getRecord();
				return item.get('marker');
			});
		}
	})
});
