import Ember from 'ember';

export default Ember.Route.extend({
    activate: function () {
        // var defaultCanvasID = 'leeds-city-council';
        var defaultCanvasID = 'zone-overview';
        this.transitionTo('canvas', defaultCanvasID);
    }
});
