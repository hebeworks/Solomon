import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {
export default Ember.Component.extend({
	didInsertElement: function () {
		this.set('currentView', 'categories');
	},

	isAdmin: function () {
		// TODO: Fix this check.
		// var adminHosts = ['localhost',
  //           '127.0.0.1',
  //           '0.0.0.0',
  //           'testing.mysolomon.co.uk',
  //           'preview.mysolomon.co.uk',
  //           'leeds.preview.mysolomon.co.uk',
  //           'yorkshirewater.mysolomon.co.uk',
  //           'mysolomon-yorkshirewater-preview.azurewebsites.net'];
		// var allowedAdminUsers = ['Hebe', 'Nate'];
		// var hostname = window.location.hostname;

		// if (adminHosts.indexOf(hostname) > -1) {
		// 	if (hostname.indexOf('preview') > -1) {
		// 		if (!Ember.isEmpty(this.get('currentUser.content.username')) &&
		// 				allowedAdminUsers.indexOf(this.get('currentUser.content.username')) > -1) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// 	return true;
		// } else {
		// 	return false;
		// }
		// // natehere
		// // if(this.get('session.secure.token') == '55f15e19fc4b2397742d1aa6') {
		// // 	return true;
		// // } else {
		// // 	return false;
		// // }
	}.property('session'),

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
