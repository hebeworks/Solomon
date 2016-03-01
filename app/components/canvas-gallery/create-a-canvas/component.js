import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ManipulationPanelContent, {

	canvas: null,
	model: null,
	message: '',
	mainTitle: 'Create a Canvas',
	title: 'Create a Canvas',
	appController: null,

	categories: function(){
		return [];
	}.property('model'),

	stories: function(){
		return [];
	}.property('model'),

	didInsertElement: function () {
		var panelState = this.get('appController.manipulationPanelState');
		if (!Ember.isEmpty(panelState)) {
			if (!Ember.isEmpty(panelState.model)) {
				this.set('model', panelState.model);
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

	// TODO: https://github.com/dockyard/ember-validations
	isValid: function (){
		return true;
	},

	saveCanvas: function() {
		if (!this.isValid())
			return;

		if (this.get('session.isAuthenticated')){
			var canvas = this.store.createRecord('canvas', {
				title: this.get('title'),
				description: this.get('description'),
				stories: this.get('stories'),
				categories: this.get('categories'),
				authorName: this.get('author'),
				twitterName: this.get('twitter'),
				userID: this.get('currentUser.id')
			});

			var self = this;

			canvas.save().then(function(savedCanvas){
				if(!Ember.isEmpty(savedCanvas.get('id'))){
					self.set('action', 'loadACanvas');
					self.sendAction('action', savedCanvas.get('id'));
				}
			});
		}
		else {
			this.set('action', 'showLoginPopup');
			this.sendAction();

			return false;
		}
	},

	actions: {

		save: function () {
			this.get('appController').closeManipulationPanel();
			this.saveCanvas();
		}

	}

});
