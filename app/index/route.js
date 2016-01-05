import Ember from 'ember';

export default Ember.Route.extend({
    activate: function () {
        var defaultCanvasID = this.get('appSettings.solomonConfig.defaultCanvas'); //'zone-overview';
        this.transitionTo('canvas', defaultCanvasID);
    }
});
