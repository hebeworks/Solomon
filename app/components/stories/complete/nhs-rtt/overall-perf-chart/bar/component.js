import Ember from 'ember';

export default Ember.Component.extend({
    
    selected: function() {
        var selected = (this.get('bar.isSelected') === true ? 'selected' : 'not selected');
        return selected;
        // $(this).attr('spc-opc_bar', selected);
    }.property('bar.isSelected'),

    mouseEnter: function() { 
        // showBarData: function() {
            // console.log('showBarData');
            
            this.set('action','setSelectedBar');
            this.sendAction('action',this.get('bar'));
            
            var chosenBar = this.get('target.chosenBar'),
                chosenBarValue = this.get('target.chosenBarValue'),
                chosenBarLocation = this.get('target.chosenBarLocation'),
                bar = this.get('bar');
                
            // // console.log('Location: ' + bar.location);
            // // console.log('percentage: ' + bar.percentage);
            
            this.set('chosenBarLocation', bar.location);
            this.set('chosenBarValue', bar.percentage);
            
        // }
    }
});
