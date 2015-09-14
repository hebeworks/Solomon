import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {
	canvas: null,
	title: 'Create a Canvas',
	message: '',
	model: null,
	categories: [],
	stories: [],

	onModelChanged: function() {
		var model = this.get('model');
		this.setProperties({
			title: model.get('title'),
			description: model.get('description'),
			stories: model.get('stories'),
			categories: model.get('categories'),
			author: model.get('author'),
			twitter: model.get('twitter')
		});
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
					debugger;
					
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
