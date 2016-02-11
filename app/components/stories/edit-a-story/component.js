import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {

	message: '',

	originalTitle: null,

	originalDescription: null,

	mainTitle: Ember.computed(function () {
		return 'Edit a Story ' + this.get('model.title');
	}),

	onInit: function(){
		const fields = this.get('editableFields');
		const title = fields.findBy('name', 'title');
		const description = fields.findBy('name', 'description');

		this.set('originalTitle', title.get('value'));
		this.set('originalDescription', description.get('value'));
	}.on('init'),

	editableFields: Ember.computed.alias('model.config'),

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
			const fields = this.get('editableFields');
			const title = fields.findBy('name', 'title');
			const description = fields.findBy('name', 'description');

			title.set('value', this.get('originalTitle'));
			description.set('value', this.get('originalDescription'));

			this.send('close');
		},

		close: function(){
			this.get('appController').closeBottomDrawer();
		}

	}

});
