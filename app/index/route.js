import Ember from 'ember';

export default Ember.Route.extend({
    // renderTemplate: function() {
    //     this.render('dashboard.header',{ outlet: 'header' });
    //     this.render({ outlet: 'body' });
    // }
    
    
    activate: function () {
        var defaultCanvasID = '55f2b8cf18f0066c0d784e86';
        this.transitionTo('canvas', defaultCanvasID);
    }

});
