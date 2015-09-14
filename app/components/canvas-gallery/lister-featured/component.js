import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {
	didReceiveAttrs: function() {
		var obj = this;
		// Get Featured
		this.store.find('category', { title: "Featured" })
			.then(function(categories) {
				if(categories != null && categories.get('length') > 0) {
					var cat = categories.get('content').get('firstObject').getRecord();
					obj.set('category', cat.get('id'));
				}
			});
	}
});
