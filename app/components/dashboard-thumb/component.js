import Ember from 'ember';

export default Ember.Component.extend({
        click: function() {
            // console.log('dash thumb click');
            this.sendAction('action', this.get('param'));
        }
});
