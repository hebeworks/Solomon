import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';
import BidEditSection from 'hebe-dash/mixins/bid/edit-section';

export default Ember.Component.extend(ManipulationPanelContent, BidEditSection, {
    model: Ember.Object.create({
        occupants: [
            {
                id: 1,
                occupantID: '12345',
                archived: false,
                organisation: 'Boots',
                property: {
                    uprn: '1',
                    add1: '19 Albion Street',
                    add2: 'Leeds',
                    add3: 'West Yorkshire',
                    add4: '',
                    postcode: 'LS1 5ET',
                    lat: 53.7971882,
                    lon: -1.5460526,
                    rateableValue: 4,
                    description: 'Trinity Leeds',
                    occupantID: '12345',
                },
                joiningDate: '2012',
                tags: 'Cosmetics, Health, Beauty',
                sector: 'Cosmetics',
                businessType: 'Retail',
                voter: 'Simon Zimmerman',
                billPayer: 'Joel Mercer',
                accountsDept: 'Nathan Smith',
                localContact: 'Ste Allan',
                companyMember: 'Mark Barrett',
                influencer: 'Ste, obvs',
                empty: false,
                address: '19 Albion Street<br>Leeds<br>West Yorkshire<br>LS1 5ET'
            }
        ]
    }),
    allPeople: [
        {
            id: 1,
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
            id: 2,
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
    ],
    title: 'Occupant Details',
    
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
            this.set('chosenOccupant', this.get('occupants.0'));
        }
    }.on('init').observes('occupants')
});
