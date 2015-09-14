import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Weather');
        this.set('subTitle', '5 day weather report for Leeds');
    }
});