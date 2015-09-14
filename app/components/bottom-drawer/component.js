import Ember from 'ember';

export default Ember.Component.extend({
	contentType: 'stories/add-a-story',

	onDrawerconfigChange: function () {
		var config = this.get('appController.bottomDrawerConfig');
		if (config != null) {
			if (!Ember.isEmpty(config.contentType)) {
				this.set('contentType', config.contentType);
			}
			this.set('openAmount', (config.openAmount != null ? config.openAmount : '-half'));
			if (config.open) {
				this.openDrawer();
			} else {
				this.closeDrawer();
			}
		} else {
			this.closeDrawer();
		}
	}.observes('appController.bottomDrawerConfig'),

	bottomDrawerScrollHack: function () {
		// Hack to reapply overflow otherwise vertical scroll doesn't work on drawer
		var el = this.$('.js-dashboard-bottom-drawer');
		el.removeClass('-overflow-y-scroll');
		setTimeout(function () {
			el.addClass('-overflow-y-scroll');
		}, 500);
	},

	toggleDrawer: function () {

	},

	openDrawer: function () {
		// console.log('openDrawer');
		this.set('open', '-open');
		this.bottomDrawerScrollHack();
	},

	closeDrawer: function () {
		// console.log('closeDrawer');
		this.set('open', '');
	},

	changeContentType: function (contentType) {
		this.set('contentType', contentType);
	},

	actions: {
		closeDrawer: function () {
			this.closeDrawer();
		},
		
		changeBottomDrawerContent: function (contentType) {
			if (contentType != null) {
				this.changeContentType(contentType);
			}
		}
	}
});
