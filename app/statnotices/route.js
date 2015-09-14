import Ember from 'ember';

export default Ember.Route.extend({
    // renderTemplate: function() {
    //     this.render({ outlet: 'fullscreen' });
    // },
    model: function () {
		return this.store.find('statnotice');
	},
    activate: function(){
        
    },
    deactivate: function() {
        
    }

});
