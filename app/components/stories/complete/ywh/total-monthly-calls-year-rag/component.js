/* global Ember, hebeutils, _, moment */
import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onYWHInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileShade: 'light',
            tileValue: 148,
            tileDesc1: 'Total calls in Nov',
            tileDesc2: 'UP 4% on 2014',
        });
        this.get('ywfilter');
        this.updateDescriptions();
    }.on('init'),

    ywFilter: Ember.computed.alias('appSettings.canvasSettings.ywFilter'),
    
    updateDescriptions: function () {
        var ywFilter = this.get('ywFilter');
        var startDate = ywFilter.startDate;
        var endDate = ywFilter.endDate;
        var ywData = ywFilter.data;
        var selectedZone = ywFilter.selectedZone;
        if (!Ember.isEmpty(startDate) && !Ember.isEmpty(endDate)) {
            var dateString = 'from ' + moment(startDate).format('Do MMM YY') + ' to ' + moment(endDate).format('Do MMM YY')
            this.set('tileDesc1', dateString);
        }
        if (!Ember.isEmpty(selectedZone)) {
            this.set('tileDesc2', selectedZone.text);
        }
        if (!Ember.isEmpty(ywData)) {
            var count = ywData.length;
            this.set('tileValue', count);
        }
    }.observes('ywFilter')
});
