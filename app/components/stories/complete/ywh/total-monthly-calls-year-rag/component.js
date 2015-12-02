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
        this.get('appSettings.canvasSettings');
        this.updateDescriptions();
    }.on('init'),

    canvasSettings: Ember.computed.alias('appSettings.canvasSettings'),

    updateDescriptions: function () {
        var canvasSettings = this.get('appSettings.canvasSettings');
        if (!Ember.isEmpty(canvasSettings)) {
            var dateString = 'from ' + moment(canvasSettings.startDate).format('Do MMM YY') + ' to ' + moment(canvasSettings.endDate).format('Do MMM YY')
            this.set('tileDesc1', dateString);
            var selectedZone = canvasSettings.selectedZone;
            if (!Ember.isEmpty(selectedZone)) {
                this.set('tileDesc2', selectedZone.text);
            }
        }
        if (!Ember.isEmpty('canvasSettings.ywData')) {
            var count = this.get('canvasSettings.ywData.length');
            this.set('tileValue', count);
        }
    }.observes('canvasSettings.ywData'),

    // Example of watching for ywQuery and making a request for data ourselves
    // onFilter: function () {
    //     var _this = this;
    //     var uri = this.get('appSettings.hebeNodeAPI') + '/yw-contact-data?query='
    //         + this.get('solomonUtils').encodeQuery(this.get('canvasSettings.ywQuery'))
    //         // + this.get('solomonUtils').encodeQuery({ $or: [{ "DMA": "D580" }, { "DMA": "C334" }] })
    //         + '&count=true'
    //         + '&limit=-1'
    //         ;
    //     this.getData(uri)
    //         .then(function(data){
    //            _this.set('tileValue',data.count);
    //            _this.updateDescriptions();
    //         });
    // }.observes('canvasSettings.ywQuery')

});
