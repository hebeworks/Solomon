import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function () {
		this.set('currentView', 'categories');
	},

	_currentView: null, //"categories",
    currentView: Ember.computed("category", {
		get: function () {
			if (!Ember.isEmpty(this.get('_currentView'))) {
				// console.log('getting _currentView: ' + this.get('_currentView'));
				return 'stories/story-library/lister-' + this.get('_currentView');
			} else {
				return this.get('_currentView');
			}
		},
		set: function (key, value) {
			// console.log('setting _currentView: ' + value);
			if (this.get('_currentView') != value && !Ember.isEmpty(value)) {
				this.set('_currentView', value);
				this.$('[data-btn-type]').attr('cpn-button', '');
				this.$('[data-btn-type="' + value + '"]').attr('cpn-button', 'chosen');

				// this.$('.js-bottom-drawer-button.btn-list .btn').removeClass('-selected');
				// this.$('.btn[data-btn-type="' + value + '"]').addClass('-selected');
			}
			return 'stories/story-library/lister-' + value;
		}
	}),

	actions: {
		switchView: function (view) {
			if (view != null && view != this.get('currentView')) {
				this.set('currentView', view);
			}
		}
	}
});
