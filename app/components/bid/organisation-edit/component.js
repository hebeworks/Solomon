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
            },
            {
                occupantID: '67890',
                archived: false,
                organisation: 'Superdrug',
                property: 'Somewhere in Leeds',
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
        allPeople: ['person1', 'person2', 'person3', 'person4']
    })
});
