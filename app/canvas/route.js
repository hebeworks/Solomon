import Ember from 'ember';

export default Ember.Route.extend({
    defaultCanvasID: 'leeds-city-council',
    model: function (params) {
        return this.store.findRecord('canvas', params.canvas_id)
            .then(function (canvas) {
                return canvas;
            });
    },

    actions: {
        viewDashboard: function (id) {
            this.transitionTo('dashboard.view', id);
        },
        duplicateCanvas: function () {
            this.controller.duplicateCanvas();
        }
    }
});


