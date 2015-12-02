import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onRagStoryInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileShade: 'light',
            // tileValue: '134',
            tileDesc1: 'contacts per 1000 people',
            // tileDesc2: '',
        });
    }.on('init'),
    
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    
    updateTile: function() {
        var _this = this,
            ywData = this.get('appSettings.canvasSettings.ywData');
            
        if (!Ember.isEmpty(ywData)) {
            var numberContacts = ywData.length,
                numberPeople = 10000, // needs real zone number
                contactsPerPeople = (numberContacts / 1000) / (numberPeople / 1000);
            
            this.set('tileValue', contactsPerPeople.toFixed(2));
        }
    }.observes('ywData')
});
