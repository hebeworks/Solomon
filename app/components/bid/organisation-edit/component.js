import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';
import BidEditSection from 'hebe-dash/mixins/bid/edit-section';

export default Ember.Component.extend(ManipulationPanelContent, BidEditSection, {
    model: Ember.Object.create({
        tradingName: 'Boots',
        legalName: 'Boots UK Ltd',
        businessName: 'Boots',
        liableParty: 'Owners of Boots',
        website: 'http://boots.co.uk',
        sectors: ['Beauty', 'Cosmetics', 'Health'],
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
            },
            {
                id: 2,
                occupantID: '67890',
                archived: false,
                organisation: 'Boots',
                property: {
                    uprn: '2',
                    add1: 'Crown Point Shopping Park',
                    add2: '3A Junction Street',
                    add3: 'Leeds',
                    add4: 'West Yorkshire',
                    postcode: 'LS10 1ET',
                    lat: 53.7886529,
                    lon: -1.539613,
                    rateableValue: 3,
                    description: 'Crown Point',
                    occupantID: '67890',
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
                influencer: 'Nate, obvs',
                empty: true,
                address: 'Crown Point Shopping Park<br>3A Junction Street<br>LeedsWest Yorkshire<br>LS10 1ET'
            }
        ],
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
    sectors: [
        {
            id: 1,
            sectorName: 'Beauty'
        },
        {
            id: 2,
            sectorName: 'Health'
        },
        {
            id: 3,
            sectorName: 'Cosmetics'
        }
    ],
    
    addPeopleToModel: function() {
        this.set('model.people', this.get('allPeople'));
    }.on('init').observes('model', 'allPeople'),
    
    actions: {
        // Warn about clearing changes, clear changes, don't close the panel
        cancel: function() {
            
        },
        
        // Save the organisation but don't close the panel
        save: function() {
            
        }
    }
});
