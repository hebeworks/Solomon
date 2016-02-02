import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {

	didInsertElement: function () {
		var userID = this.get('session.secure.token');
		if(!Ember.isEmpty(userID)) {
			this.set('userID', userID);
		}
	},

	onUserLogIn: function() {
		this.set('userID', this.get('session.secure.token'));
	}.observes('session.secure.token')

});
