import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {
	didReceiveAttrs: function () {
		this.getItems();
	},
	categories: null,
	onItemsLoaded: function () {
		var categories = [];
		var items = this.get('items').toArray();
		items.forEach(function (item) {
			item.get('categories').toArray().forEach(function(cat){
				var catID = cat.get('id');
				var featuredCategoryID = '55f2b35018f0066c0d784e6c';

				if(catID != featuredCategoryID) {
					var foundCat = categories.find(function(cat){ return cat.category.get('id') == catID; });
					if(!Ember.isEmpty(foundCat)) {
						foundCat.items.push(item);
					} else {
						// first time with this cat
						// add it to the array
						categories.push({
							category: cat,
							items: [item]
						});
					}
				}
			});
		});
		this.set('categories', categories);
	}.observes('items.@each.categories')
});
