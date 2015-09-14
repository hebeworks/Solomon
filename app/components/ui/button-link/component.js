import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',

	click: function () {
		if (this.get('href') != null) {
			switch (this.get('type')) {
				default:
					// external link
					window.open(this.get('href'));
					break;
				case 'mail':
					// mailto link
					window.open(this.get('href').toString().ensureStartingString('mailto:'));
					break;
			}
		}
	}
});
