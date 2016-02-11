import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {

	message: '',

	editableFields: Ember.computed.alias('model.config'),

	editableFieldAttributes: function(){
		return {};
	}.property('editableFields'),

	mainTitle: Ember.computed(function () {
		return 'Edit a Story ' + this.get('model.title');
	}),

	storeEditableFieldValues: function(){
		const fields = this.get('editableFields');

		if(!fields)
			return;

		fields.forEach(function(field){
			this.set('editableFieldAttributes.' + field.get('name'), field.get('value'))
		}.bind(this));
	}.on('init').observes('editableFields'),

	restoreEditableFieldValues: function(){
		const fields = this.get('editableFields');

		if(!fields)
			return;

		fields.forEach(function(field){
			field.set('value', this.get('editableFieldAttributes.' + field.get('name')));
		}.bind(this));
	},

	save: function () {
		this.set('action', 'saveCanvasState');
		this.sendAction('action');
	},

	actions: {

		save: function (){
			this.save();
			this.send('close');
		},

		cancel: function (){
			this.restoreEditableFieldValues();
			this.send('close');
		},

		close: function(){
			this.get('appController').closeBottomDrawer();
		}

	}

});
