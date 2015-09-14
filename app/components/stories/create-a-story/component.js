import Ember from 'ember';

export default Ember.Component.extend({
	story: null,
	title: null,
	storyType: null,
	configJSON: null,
	categories: [],
	message: '',
	
	didReceiveAttrs: function () {
		// if (this.get('story') == null) {
		// 	var story = this.store.createRecord('story', {});
		// 	// 	title: 'New Story',
		// 	// 	storyType: 'clock-face',
		// 	// 	categories: [],
		// 	// 	configJSON: '{"test":"testy"}',
		// 	// });
			
		// 	// // Set relationships
		// 	// this.store.find('user', 1).then(function (user) {
		// 	// 	post.set('author', user);
		// 	// });
		// 	this.set('story', story);
		// }
	},
	
	allCategories: Ember.computed({
		get() {
			return this.store.query('category',{})
		}
	}),

	isStoryValid: function () {
		var isValid = true;
		// todo: client-side validation
		// try https://github.com/dockyard/ember-validations
		// if (this.get('story') != null) {
		// 	if (Ember.isEmpty(this.get('story.title'))) {
		// 		var errors = this.get('story.errors');
		// 		errors.pushObject({ "title": "please provide a title" });
		// 		isValid = false;
		// 	}
		// }
		return isValid;
	},

	saveStory: function () {
		if (this.isStoryValid()) {
			var obj = this;
			obj.set('message', 'Saving Story');
			
			var story = this.store.createRecord('story', {
				title: this.get('title'),
				storyType: this.get('storyType'),
				configJSON: this.get('configJSON'),
				categories: this.get('categories')
			});
			story.save()
				.then(function(response){
					obj.setProperties({
						message: 'Story Saved',
						title: null,
						storyType: null,
						configJSON: null,
						categories: []
					})
				});
		}
	},

	actions: {
		save: function () {
			this.saveStory();
		}
	}
});
