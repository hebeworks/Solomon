import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';
import BidEditSection from 'hebe-dash/mixins/bid/edit-section';

export default Ember.Component.extend(ManipulationPanelContent, BidEditSection, {
    model: Ember.Object.create({
        occupants: [
            {
                occupantID: '12345',
                archived: false,
                organisation: 'Boots',
                property: 'Somewhere in Trinity',
                joiningDate: '2012',
                tags: 'Cosmetics, Health, Beauty',
                sector: 'Cosmetics',
                businessType: 'Retail',
                voter: 'Simon Zimmerman',
                billPayer: 'Joel Mercer',
                accountsDept: 'Nathan Smith',
                localContact: 'Ste Allan',
                companyMember: 'Mark Barrett',
            }
        ]
    }),
    
    occupants: Ember.computed('model', function() {
        var model = this.get('model');
        
        if (model.constructor === Array) {
            console.log('model is array');
            return model;
        } else {
            console.log('model is not array');
            var newModel = model.occupants;
            return newModel;
        }
    }),
    
    multipleOccupants: false,
    chosenOccupant: null, // will be set by choosing an occupant in the select2 or preset by directly editing an occupant
    
    checkModel: function() {
        console.log('model');
        console.log(this.get('occupants'));
        var modelSize = this.get('occupants').length;
        
        if (modelSize > 1) {
            console.log('modelSize > 1');
            this.set('multipleOccupants', true);
        }  else {
            console.log('modelSize <= 1');
            this.set('multipleOccupants', false);
            this.set('chosenOccupant', this.get('occupants'));
        }
        
        console.log('occupants');
        console.log(this.get('occupants'));
        
        console.log('chosenOccupant');
        console.log(this.get('chosenOccupant'));
        
        console.log('chosenOccupant.occupantID');
        console.log(this.get('chosenOccupant.occupantID'));
    }.on('init').observes('occupants')
});
