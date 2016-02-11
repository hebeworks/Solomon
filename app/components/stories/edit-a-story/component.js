import Ember from 'ember';
import BottomDrawerContent from 'hebe-dash/mixins/bottom-drawer-content';

export default Ember.Component.extend(BottomDrawerContent, {

	message: '',

	mainTitle: Ember.computed(function () {
		return 'Edit a Story ' + this.get('model.title');
	}),

	onInit: function(){
		this.get('model.config')
	}.on('init'),

	editableFields: Ember.computed.alias('model.config'),

	save: function () {
		this.set('action', 'saveCanvasState');
		this.sendAction('action');
	},

	actions: {

		save: function (){
			this.save()
			this.send('close');
		},

		cancel: function (){
			this.send('close');
		},

		close: function(){
			this.get('appController').closeBottomDrawer();
		}

	}

});
