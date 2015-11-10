import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {
	mainTitle: Ember.computed(function () {
		return 'Edit a Story ' + this.get('model.title');
	}),
	message: '',

	fields: Ember.computed.alias('model.config'),
	_editableFields: null,
	editableFields: Ember.computed('model.config', {
		get() {
			if (Ember.isEmpty(this.get('_editableFields'))) {
				var model = this.get('model.config');
				this.set('_editableFields', model)
				return model;
			}
			return this.get('_editableFields');
		},
		set(key, value) {
			if (this.get('_editableFields') != value) {
				this.set('_editableFields', value);
			}
			return this.get('_editableFields');
		}
	}),
	
	onEditableFieldChanged: Ember.computed.observes('editableFields.@each', function(){
		alert('change');
	}),

	save: function () {
		var fields = this.get('editableFields');
		debugger;
		fields.forEach(function (field) {
			console.log(Ember.inspect(field));
		});

		// this.set('action', 'saveCanvasState');
		// this.sendAction('action');
	},

	actions: {
		save: function () {
			this.save();
		}
	}
});
