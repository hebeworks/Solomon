import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {
	mainTitle: Ember.computed(function () {
		return 'Edit a Story ' + this.get('model.title');
	}),
	message: '',

	onInit: function(){
		this.get('model.config')
	}.on('init'),

	editableFields: Ember.computed.alias('model.config'),
	// _editableFields: null,
	
	// editableFields: Ember.computed('model.config', {
	// 	get() {
	// 		if (Ember.isEmpty(this.get('_editableFields'))) {
	// 			var model = this.get('model.config');
	// 			this.set('_editableFields', model)
	// 			return model;
	// 		}
	// 		return this.get('_editableFields');
	// 	},
	// 	set(key, value) {
	// 		if (this.get('_editableFields') != value) {
	// 			this.set('_editableFields', value);
	// 		}
	// 		return this.get('_editableFields');
	// 	}
	// }),
	
	save: function () {
		this.set('action', 'saveCanvasState');
		this.sendAction('action');
	},

	actions: {
		save: function () {
			this.save();
		}
	}
});
