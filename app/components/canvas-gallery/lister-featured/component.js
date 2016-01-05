import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {
	// didReceiveAttrs: function () {
	// 	var obj = this;
		
	// 	// todo: load by featured category - but ensure no other users can create using featured category
	// 	// Get Featured
	// 	this.store.find('category', { title: "Featured" })
	// 		.then(function(categories) {
	// 			if(categories != null && categories.get('length') > 0) {
	// 				var cat = categories.get('content').get('firstObject').getRecord();
	// 				obj.set('category', cat.get('id'));
	// 			}
	// 		});
	// }
	didInsertElement: function () {
		// var userID = '55f15e19fc4b2397742d1aa6';
		// if (!Ember.isEmpty(userID)) {
		// 	this.set('userID', userID);
		// }
		
		var featuredCategoryID = '55f2b35018f0066c0d784e6c';
		this.set('category', featuredCategoryID);
	}
});
