import Ember from 'ember';
import StoryLibraryLister from 'hebe-dash/mixins/story-library-lister';

export default Ember.Component.extend(StoryLibraryLister, {
	didReceiveAttrs: function () {
		this.getStories();
	},

	categories: null,

	onStoriesLoaded: function () {
		var categories = [];

		var stories = this.get('stories').toArray();
		stories.forEach(function (story) {
			
			story.get('categories').toArray().forEach(function(cat){
				var catID = cat.get('id');
				var foundCat = categories.find(function(cat){ return cat.category.get('id') == catID; });
				if(!Ember.isEmpty(foundCat)) {
					foundCat.stories.push(story);
				} else {
					// first time with this cat
					// add it to the array
					categories.push({
						category: cat,
						stories: [story]
					})
				}
			});
			
		});
		
		this.set('categories', categories);



		// // get a unique list of all the categories
		// var varA = _.map(this.get('stories').toArray(), function (obj) {
		// 	return obj.get('categories').toArray();
		// });
		// var varB = _.flatten(varA);
		// var cats = _.uniq(varB);
		// this.set('categories', cats);

		/*
			got all stories	
			group stories by their categories > ids
		 */
		// var stories = this.get('stories').toArray();
		// var groupedStories = _.groupBy(stories, function (story) { return _.first(story.get('categories').toArray()).get('id'); });
		// debugger;
		// for (var prop in groupedStories) {
		// 	if (groupedStories.hasOwnProperty(prop)) {
		// 		console.log(prop + ' - ' + groupedStories[prop]);
		// 	}
		// }
		// this.set('groupedStories', groupedStories);



	}.observes('stories.@each.categories')	
});
