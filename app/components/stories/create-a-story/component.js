import Ember from 'ember';

export default Ember.Component.extend({
	mainTitle: 'Create a Story',
	message: '',
	
	appController: null,

	title: null,
	storyType: null,
	configJSON: null,
	categories: null,
	model:null,

	didInsertElement: function() {
		this.set('model', this.get('appController.bottomDrawerConfig.model'));
	},
	

	allCategories: Ember.computed({
		get() {
			return this.store.query('category', {});
		}
	}),

	onModelChanged: function () {
		var model = this.get('model');
		this.setProperties({
			title: model.get('title'),
			description: model.get('description'),
			configJSON: model.get('configJSON'),
			categories: model.get('categories')
		});
	}.observes('model'),

	configFields: Ember.computed('model', {
		get() {
			return (!Ember.isEmpty(this.get('model.config')) ? this.get('model.config').copy() : []);
		}
	}),

	onFieldsChanged: function () {
		this.set('model.config', this.get('configFields'));
	}.observes('configFields', 'configFields.@each.value'),

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

	onCatsChanged: function () {
		alert('cats : ' + this.get('categories.length'));
	}.observes('categories'),

	saveStory: function () {
		debugger;
		if (this.isStoryValid()) {
			var obj = this;
			obj.set('message', 'Saving Story');

			var model = this.get('model');
			var story = null;
			if (!Ember.isEmpty(model)) {
				// save the canvas this story belongs to 
				
				story = model;
				story.setProperties({
					title: this.get('title'),
					storyType: this.get('storyType'),
					configJSON: this.get('configJSON'),
					categories: this.get('categories')
				});
				this.set('action','saveCanvasState');
				this.sendAction('action');
			} else {
				// Create a new story and save
				story = this.store.createRecord('story');
				story.setProperties({
					title: this.get('title'),
					storyType: this.get('storyType'),
					configJSON: this.get('configJSON'),
					categories: this.get('categories')
				});
	
				story.save()
					.then(function (response) {
						obj.setProperties({
							message: 'Story Saved',
							title: null,
							storyType: null,
							configJSON: null,
							categories: null
						})
					});
			}
		}
	},

	actions: {
		save: function () {
			this.saveStory();
		}
	}
});
