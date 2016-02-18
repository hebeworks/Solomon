import Ember from 'ember';

export default Ember.Component.extend({
    initialConfig: {
        title: 'Parking Fines',
        subTitle: 'Q4 2014/15',
        width: '1',
        height: '1',
        color: 'yellow',
        viewOnly: true
    },
    
    didInsertElement: function() {
        
    }
});
