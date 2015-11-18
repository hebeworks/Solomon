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
        },
        addAStory: function (story) {
            // alert('addAStory');
            this.controller.addAStory(story);
        },
        removeAStory: function (story) {
            // alert('addAStory');
            this.controller.removeAStory(story);
        },
        saveCurrentOrder: function (orderArr) {
            this.controller.saveCurrentOrder(orderArr);
        },
        saveCanvasState: function () {
            this.controller.saveCanvasState();
        }
    }
});


