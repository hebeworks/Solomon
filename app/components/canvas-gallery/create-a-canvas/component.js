import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {
	canvas: null,
	mainTitle: 'Create a Canvas',
	title: 'Create a Canvas',
	message: '',
	model: null,
	categories: [],
	stories: [],
	appController: null,
	
	didInsertElement: function () {
		var config = this.get('appController.bottomDrawerConfig');
		if (!Ember.isEmpty(config)) {
			if (!Ember.isEmpty(config.model)) {
				this.set('model', config.model);
			}
			if (!Ember.isEmpty(config.mainTitle)) {
				this.set('mainTitle', config.mainTitle);
			}
		}
	},

	onModelChanged: function () {
		var model = this.get('model');
		this.setProperties({
			title: model.get('title'),
			description: model.get('description'),
			stories: model.get('stories'),
			author: model.get('author'),
			twitter: model.get('twitter')
		});
		// categories: model.get('categories')
	}.observes('model'),

	allCategories: Ember.computed({
		get() {
			return this.store.query('category', {})
		}
	}),

	allStories: Ember.computed({
		get() {
			return this.store.query('story', {})
		}
	}),

	isValid: function () {
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

	saveCanvas: function () {
		if (this.isValid()) {
			var obj = this;
			obj.set('message', 'Saving Canvas');

			var appController = this.get('appController');
			var session = appController.get('session');
			if (session.isAuthenticated) {
				var userID = session.get('content.secure.token');
				if (!Ember.isEmpty(userID)) {

					var canvas = obj.store.createRecord('canvas', {
						title: obj.get('title'),
						description: obj.get('description'),
						stories: obj.get('stories'),
						categories: obj.get('categories'),
						authorName: obj.get('author'),
						twitterName: obj.get('twitter'),
						userID: userID
					});

					canvas.save()
						.then(function (savedCanvas) {
							if (!Ember.isEmpty(savedCanvas.get('id'))) {
								obj.set('action', 'loadACanvas');
								obj.sendAction('action', savedCanvas.get('id'));
							}
						});
				}
			} else {
				// alert('You need to login');
				this.set('action', 'showLoginPopup');
				this.sendAction();
				return false;
			}
		}
	},

	actions: {
		save: function () {
			this.saveCanvas();
		}
	}
});
