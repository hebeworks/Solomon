import Ember from 'ember';

export default Ember.Route.extend({

    model: function (params) {
        return this.store.findRecord('canvas', params.canvas_id).then(
            function (canvas){
                return canvas;
            },
            function(error){
                const controller = this.container.lookup('controller:application');

                controller.set('appSettings.errorMessage', "Sorry we can't find the canvas you were looking for. Try find one using the Gallery link");
            }.bind(this)
        );
    },

    actions: {

        viewDashboard: function (id) {
            this.transitionTo('dashboard.view', id);
        },

        duplicateCanvas: function () {
            this.controller.duplicateCanvas();
        },

        addAStory: function (story) {
            this.controller.addAStory(story);
        },

        removeAStory: function (story) {
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
