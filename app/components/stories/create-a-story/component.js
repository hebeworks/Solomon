import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {
	mainTitle: 'Create a Story',
	message: '',

	modelTitle: null,
	modelCategories: [],

	configFields: null,

	allCategories: Ember.computed({
		get() {
			return this.store.query('category', {});
		}
	}),

	didInsertElement: function () {
		this.onModelChanged();
	},

	onModelChanged: function () { 
		var model = this.get('model');
		if (!Ember.isEmpty(model)) {
			var cats = model.get('categories').toArray();
			var catIDs = cats.map(function (item) {
				return item.get('id');
			})
			var allCats = this.get('allCategories').toArray();
			var selectedCats = allCats.filter(function (item, index, self) {
				return catIDs.indexOf(item.get('id')) > -1;
			})
			this.setProperties({
				title: model.get('title'),
				storyType: model.get('storyType'),
				categories: selectedCats
			});
			this.setupEditableFields();
		}
	}.observes('model'),

	setupEditableFields: function () {
		var fields = this.get('model.config');
		if (!Ember.isEmpty(fields)) {
			alert('have ' + fields.length + ' fields');
			this.set('configFields', fields);
			fields.forEach(function (field) {
	
			});
		}
	}.observes('model','model.config','model.config.@each'),

	save: function () {
		this.set('model.title', this.get('modelTitle'));
		this.set('model.categories', this.get('modelCategories'));

		this.set('action', 'saveCanvasState');
		this.sendAction('action');
	},

	actions: {
		save: function () {
			this.save();
		}
	}
});
