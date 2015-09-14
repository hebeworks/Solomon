import Ember from 'ember';
import StoryLibraryLister from 'hebe-dash/mixins/story-library-lister';

export default Ember.Component.extend(StoryLibraryLister, {
	didReceiveAttrs: function () {
		var obj = this;
		// Get Featured
		this.store.find('category', { title: "Featured" })
			.then(function (categories) {
				if (categories != null && categories.get('length') > 0) {
					var cat = categories.get('content').get('firstObject').getRecord();
					obj.set('category', cat.get('id'));
				}
			});
	}
});
