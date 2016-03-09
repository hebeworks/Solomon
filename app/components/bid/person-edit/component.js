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
                votingFor: ['Boots', 'Superdrug', 'Victoria\'s Secret'],
                localContactFor: ['Superdrug', 'Five Guys'],
                billPayerFor: ['The Mrs', 'The kids'],
                accountsDeptFor: ['Not the Mrs'],
            }
        ]
    }),
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
