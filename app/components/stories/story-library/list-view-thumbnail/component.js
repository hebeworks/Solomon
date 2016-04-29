import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
    attributeBindings: ['cpn-thumb-list_item'],
    'cpn-thumb-list_item': '',
	
	click: function() {
		this.sendAction('action', this.model);
	},
    
    canDelete: Ember.computed('model', function() {
        const modelType = this.model.get('constructor').typeKey;
        
        const currentUser = this.get('currentUser');
        const allowedScope = this.model.get('id');
        const allowedModelType = 'canvas';
        const allowedAction = 'delete';
        
        if (modelType === 'canvas') {
            if (currentUser.get('isAllowed')(allowedScope, allowedModelType, allowedAction)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }),
    
    actions: {
        deleteCanvas(model) {
            // this.set('action', 'deleteCanvas');
            // this.send('action', model);
        }
    }
});
