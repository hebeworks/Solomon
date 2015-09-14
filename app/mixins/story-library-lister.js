import Ember from 'ember';

export default Ember.Mixin.create({
	// Properties
	searchTerm: null,
	category: 'All',
	stories: null,
	noResults: false,
	isLoading: false,
	
	// Methods
	getStories: function () {
		var obj = this;
		this.set('isLoading', true);

		var query = {};
		if (this.get('category') != null && this.get('category') != "All" && this.get('category.length') > 0) {
			query.category = this.get('category');
		}

		if (this.get('searchTerm') != null) {
			query.q = this.get('searchTerm');
		}

		// console.log('filter query = ' + query);

		this.store.query('story', query)
			.then(function (data) {
				// console.log('found ' + data.get('length') + ' stories');
				obj.set('stories', data);
				var noResults = (data.get('length') == 0 ? true : false);
				obj.set('isLoading', false);
				obj.set('noResults', noResults);
			});

	}.observes('category', 'searchTerm'),

	actions: {

		filterByCat: function (params) {
			console.log('Stories: setting category');
			this.set('category', params);
		}
	}
});
