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
        ],
        allPeople: [
            {
                name: 'Ste Allan',
                firstName: 'Ste',
                lastName: 'Allan',
                jobTitle: 'Front end dev',
                address1: 'Hebe Works',
                address2: '31 The Calls',
                address3: 'Leeds',
                address4: '',
                postcode: 'LS2 5EY',
                votingFor: ['Boots', 'Superdrug', 'Victoria\'s Secret'],
                localContactFor: ['Superdrug', 'Five Guys'],
                billPayerFor: ['The Mrs', 'The kids'],
                accountsDeptFor: ['Not the Mrs'],
            },
            {
                name: 'Nate Smith',
                firstName: 'Nate',
                lastName: 'Smith',
                jobTitle: 'Back end dev',
                address1: 'Hebe Works',
                address2: '31 The Calls',
                address3: 'Leeds',
                address4: '',
                postcode: 'LS2 5EY',
                votingFor: ['Boots', 'Superdrug', 'Victoria\'s Secret'],
                localContactFor: ['Superdrug', 'Five Guys'],
                billPayerFor: ['The Mrs', 'The kids'],
                accountsDeptFor: ['Not the Mrs'],
            }
        ]
    }),
    
    occupants: Ember.computed('model', function() {
        var model = this.get('model');
        
        if (model.constructor === Array) {
            return model;
        } else {
            var newModel = model.occupants;
            return newModel;
        }
    }),
    
    multipleOccupants: false,
    chosenOccupant: null, // will be set by choosing an occupant in the select2 or preset by directly editing an occupant
    
    checkModel: function() {
        var modelSize = this.get('occupants').length;
        
        if (modelSize > 1) {
            this.set('multipleOccupants', true);
        }  else {
            this.set('multipleOccupants', false);
            this.set('chosenOccupant', this.get('occupants'));
        }
    }.on('init').observes('occupants')
});
