import Ember from 'ember';

export default Ember.Route.extend({
    activate: function () {
        var defaultCanvasID = 'leeds-city-council';
        this.transitionTo('canvas', defaultCanvasID);
    }
});
