import Ember from 'ember';

export default Ember.Component.extend({
	btnCheckInterval: 500,
	
	onInserted: function () {
		Ember.run.later(this, this.checkForLinks, this.get('btnCheckInterval'));
	}.on('didInsertElement'),

	checkForLinks: function () {
		var _this = this;
		// var btnGetStarted = this.$('#hype-obj-GhEFCIJCRpxdQkP9');
		var btnGetStarted = this.$('.HYPE_element:contains("Get started")');
		var btnWatchAgain = this.$('.HYPE_element:contains("Watch again")');
		var btnSkip = this.$('.HYPE_element:contains("Skip this")');
		if (!Ember.isEmpty(btnGetStarted)) {
			btnGetStarted.on('click', function (e) {
				e.preventDefault();
				_this.closeTutorial();
			});
			btnSkip.on('click', function (e) {
				e.preventDefault();
				_this.closeTutorial();
			});
			Ember.run.cancel(_this.checkForLinks);
		} else {
			Ember.run.later(this, _this.checkForLinks, _this.get('btnCheckInterval'));
		}
	},

	closeTutorial: function () {
		this.set('action', "closeTutorial");
		this.sendAction('action');
	}
});
