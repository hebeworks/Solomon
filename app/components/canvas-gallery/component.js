import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {
export default Ember.Component.extend({
	didInsertElement: function () {
		this.setSelectedButton();
	},
	_currentView: "featured",
    currentView: Ember.computed("category", {
		get: function () {
			// console.log('getting _currentView: ' + this.get('_currentView'));
			return 'canvas-gallery/lister-' + this.get('_currentView');
		},
		set: function (key, value) {
			// console.log('setting _currentView: ' + value);
			if (this.get('_currentView') != value) {
				this.set('_currentView', value);
			}
			return 'canvas-gallery/lister-' + value;
		}
	}),

	setSelectedButton: function () {
		this.$('.js-gallery-button.btn-list .btn').removeClass('-selected');
		this.$('.btn[data-btn-type="' + this.get('_currentView') + '"]').addClass('-selected');
	}.observes('currentView'),

	// createACanvas: function() {
	// 	this.get('appController').openBottomDrawer({ contentType: 'canvas-gallery/create-a-canvas' });
	// },
	
	actions: {
		switchView: function (view) {
			if (view != null && view != this.get('currentView')) {
				this.set('currentView', view);
			}
		},
		// createACanvas: function() {
		// 	this.createACanvas();
		// }
	}
});
