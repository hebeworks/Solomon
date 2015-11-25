/* global Ember, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        color: 'black',
        width: '1',
        height: '1',
        viewOnly: true
    },
    
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
            month:      (date.format('MMMM').length <= 7 ? date.format('MMMM') : date.format('MMM')),
            year:      date.format('YYYY')
        };
        this.set('date',obj);        
    }
});
