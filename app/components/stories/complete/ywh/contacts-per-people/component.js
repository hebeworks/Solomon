import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onRagStoryInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileShade: 'light',
            // tileValue: '134',
            tileDesc1: 'contacts per 1,000 properties',
            // tileDesc2: '',
        });
    }.on('init'),
    
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    
    updateTile: function() {
        var _this = this,
            ywData = this.get('ywData');
            
        if (!Ember.isEmpty(ywData)) {
            var numberContacts = ywData.length,
                numberProperty = 10000, // needs real zone number
                contactsPerProperty = (numberContacts / 1000) / (numberProperty / 1000);
            
            this.set('tileValue', contactsPerProperty.toFixed(2));
        }
    }.observes('ywData')
});
