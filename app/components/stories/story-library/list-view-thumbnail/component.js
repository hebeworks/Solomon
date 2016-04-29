import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
    attributeBindings: ['cpn-thumb-list_item'],
    'cpn-thumb-list_item': '',
	
	click: function() {
		this.sendAction('action', this.model);
	},
    
    actions: {
        deleteCanvas(model) {
            // this.set('action', 'deleteCanvas');
            // this.send('action', model);
        }
    }
});
