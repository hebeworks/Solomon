import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    date: {},
    didReceiveAttrs: function() {
        this.set('title', '');
        this.set('subTitle', '');
        var date = moment(new Date());
        var ordinal = date.format('Do').replace(date.format('D'),'');
        var obj = {
            dayOfWeek:  date.format('dddd'),
            day:        date.format('D'),
            ordinal:    ordinal,
            month:      (date.format('MMMM').length <= 8 ? date.format('MMMM') : date.format('MMM')),
            year:      date.format('YYYY')
        }
        this.set('date',obj);        
    }
});
