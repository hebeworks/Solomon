import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';
import BidEditSection from 'hebe-dash/mixins/bid/edit-section';

export default Ember.Component.extend(ManipulationPanelContent, BidEditSection, {
    model: Ember.Object.create({
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
                votingFor: [
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
                ],
                localContactFor: [
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
                ],
                billPayerFor: [
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
                accountsDeptFor: [
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
            }
        ]
    }),
    allOccupants: [
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
    title: 'Person Details',
    
    people: Ember.computed('model', function() {
        var model = this.get('model');
        
        if (model.constructor === Array) {
            return model;
        } else {
            var newModel = model.allPeople;
            return newModel;
        }
    }),
    
    multiplePeople: false,
    chosenPerson: null, // will be set by choosing an occupant in the select2 or preset by directly editing an occupant
    
    checkModel: function() {
        var modelSize = this.get('people').length;
        
        if (modelSize > 1) {
            this.set('multiplePeople', true);
        }  else {
            this.set('multiplePeople', false);
            this.set('chosenPerson', this.get('people.0'));
        }
    }.on('init').observes('people')
});
