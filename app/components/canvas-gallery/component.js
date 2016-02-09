import Ember from 'ember';
export default Ember.Component.extend({

	_currentView: "featured",

	didInsertElement: function () {
		this.setSelectedButton();
	},

  currentView: Ember.computed("category", {

		get: function (){
			return 'canvas-gallery/lister-' + this.get('_currentView');
		},

		set: function (key, value){
			if (this.get('_currentView') != value){
				this.set('_currentView', value);
			}

			return 'canvas-gallery/lister-' + value;
		}

	}),

	setSelectedButton: function () {
		this.$('#gallery-buttons button').attr('cpn-button', '');
		this.$('[data-btn-type="' + this.get('_currentView') + '"]').attr('cpn-button', 'chosen');
	}.observes('currentView'),

	appController: function (){
		return this.controllerFor('Application');
	}.property(),

	actions: {

		switchView: function (view) {
			if (view != null && view != this.get('currentView')) {
				this.set('currentView', view);
			}
		}

	}

});
