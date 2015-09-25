 import Ember from 'ember';

export default Ember.Component.extend({
	mainTitle: 'Create a Story',
	message: '',

	modelTitle: null,
	modelCategories: [],

	appController: null,
	model: Ember.computed.alias('appController.bottomDrawerConfig.model'),

	allCategories: Ember.computed({
		get() {
			return this.store.query('category', {});
		}
	}),

	didInsertElement: function () {
		var obj = this;
		setTimeout(function () {
			obj.onModelChanged();
		}, 500);
	},

	onModelChanged: function () {
		var model = this.get('model');
		if (!Ember.isEmpty(model)) {
			debugger;
			var cats = model.get('categories').toArray();
			var catIDs = cats.map(function(item){
				return item.get('id');
			})
			var allCats = this.get('allCategories').toArray();
			var selectedCats = allCats.filter(function (item, index, self) {
				return catIDs.indexOf(item.get('id')) > -1;
			})
			this.setProperties({
				modelTitle: model.get('title'),
				modelCategories: selectedCats
			})
		}
	}.observes('model'),
	
	save: function() {
		this.set('model.title',this.get('modelTitle'));
		this.set('model.categories',this.get('modelCategories'));
		
		this.set('action','saveCanvasState');
		this.sendAction('action');
	},
	
	actions: {
		save: function() {
			this.save();
		}
	}
});
