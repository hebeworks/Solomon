import Ember from 'ember';

export default Ember.Mixin.create({

	searchTerm: null,

	category: 'All',

	userID: null,

	items: null,

	noResults: false,

	isLoading: false,

	getItems: function () {
		var obj = this;
		var query = {};

		this.set('isLoading', true);

		// Category Filter
		if (this.get('category') != null &&
				this.get('category') != "All" &&
				this.get('category.length') > 0){
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

		this.store.query('canvas', query).then(function (data) {
			obj.set('items', data);
			obj.set('isLoading', false);
			obj.set('noResults', data.get('length') == 0 ? true : false);
		});
	}.observes('category', 'searchTerm', 'userID'),

	actions: {

		filterByCat: function (params) {
			this.set('category', params);
		}

	}

});
