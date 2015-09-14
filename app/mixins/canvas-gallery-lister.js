import Ember from 'ember';

export default Ember.Mixin.create({
	// Properties
	searchTerm: null,
	category: 'All',
	userID: null,
	items: null,
	noResults: false,
	isLoading: false,
	
	// Methods
	getItems: function () {
		var obj = this;
		this.set('isLoading', true);
		
		var query = {};
		// Category Filter
		if (this.get('category') != null && this.get('category') != "All" && this.get('category.length') > 0) {
			query.category = this.get('category');
		}
		
		// Free text search
		if (this.get('searchTerm') != null) {
			query.q = this.get('searchTerm');
		}

		// User canvasses search
		if (!Ember.isEmpty(this.get('userID'))) {
			query.userID = this.get('userID');
		}
		
		// Find canvasses
		this.store.query('canvas', query)
			.then(function (data) {
				// console.log('found ' + data.get('length') + ' canvases');
				obj.set('items', data);
				var noResults = (data.get('length') == 0 ? true : false);
				obj.set('isLoading', false);
				obj.set('noResults', noResults);
			});

	}.observes('category', 'searchTerm', 'userID'),

	actions: {
		filterByCat: function (params) {
			// console.log('Canvases: setting category');
			this.set('category', params);
		}
	}
});
