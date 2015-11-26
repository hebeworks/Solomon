/* global Ember, hebeutils, _ */
import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onYWHInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileValue: 148,
            tileDesc1: 'Total calls in Nov',
            tileDesc2: 'UP 4% on 2014',
        });
        this.get('appSettings.canvasSettings');
        this.onCanvasSettings();
    }.on('init'),
    
    onCanvasSettings: function(){
        var canvasSettings = this.get('appSettings.canvasSettings');
        var dateSting = 'from ' + moment(canvasSettings.startDate).format('MMM YY') + ' to ' + moment(canvasSettings.endDate).format('MMM YY')
        this.set('tileDesc1',dateSting);
    }.observes('appSettings.canvasSettings.startDate','appSettings.canvasSettings.endDate'),
});
