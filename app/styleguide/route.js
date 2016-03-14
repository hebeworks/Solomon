import Ember from 'ember';

export default Ember.Route.extend({
    select2Content: Ember.A([
        {
            optionName: 'Option 1'
        },
        {
            optionName: 'Option 2'
        },
        {
            optionName: 'Option 3'
        }
    ]),
    
    select2Value: null,
    
    onInit: function() {
        console.log('styleguide route');
    }.on('init')
});
