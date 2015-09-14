import Ember from 'ember';

export default Ember.Component.extend({
	category: null,

	didReceiveAttrs: function () {
		if (this.get('category') == null) {
			var category = this.store.createRecord('category', {
				title: 'New Category'
			});
			
			// // Set relationships
			// this.store.find('user', 1).then(function (user) {
			// 	post.set('author', user);
			// });
			this.set('category', category);
		}
		this.loadCategories();
	},
	allCategories: null,
	loadCategories: function () {
		var obj = this;
		return this.store.query('category', {})
			.then(function (categories) {
				obj.set('allCategories', categories);
			})
	},

	isCategoryValid: function () {
		var isValid = true;
		// todo: client-side validation
		// try https://github.com/dockyard/ember-validations
		// if (this.get('category') != null) {
		// 	if (Ember.isEmpty(this.get('category.title'))) {
		// 		var errors = this.get('category.errors');
		// 		errors.pushObject({ "title": "please provide a title" });
		// 		isValid = false;
		// 	}
		// }
		return isValid;
	},

	saveCategory: function () {
		if (this.isCategoryValid()) {
			var obj = this;
			this.get('category').save().then(
				function (cat) {
					obj.loadCategories();
				}
				);
		}
	},

	actions: {
		save: function () {
			this.saveCategory();
		}
	}
});
