import Ember from 'ember';

export default Ember.Route.extend({
    defaultCanvasID: '554bccd420034e2634000002',
    // renderTemplate: function () {
    //     this.render('dashboard.header', { outlet: 'header' });
    //     this.render({ outlet: 'body' });
    // },
    model: function (params) {
        if (params.canvas_id != null) {
            // var canvas_id = '554bccd420034e2634000002';
            // alert(params.canvas_id);
            // debugger;
            return this.store.findRecord('canvas', params.canvas_id)
                .then(function (canvas) {
                    return canvas;
                });
        } else {
            return null;
        }
        // return this.store.find('story').then(function(data){
        //     console.log('Canvas route > story loaded: ' + data.content);
        //     return data;
        // });
    },
    actions: {
        viewDashboard: function (id) {
            this.transitionTo('dashboard.view', id);
        },
        duplicateCanvas: function() {
            this.controller.duplicateCanvas();
        }
    }
});


