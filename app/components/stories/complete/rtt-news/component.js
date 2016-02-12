/* global Ember, hebeutils, _ */
import RSSGeneric from '../rss-generic/component';

export default RSSGeneric.extend({

    defaultFeedURL: 'http://news.leeds.gov.uk/feed/en',

    setSliderLoadedState: function(){
      Ember.run.next(this, function(){
        this.set('loaded', !this.get('loading'));
      });
    }.observes('loading'),

    storyConfig: {
        title: 'In the news',
        subTitle: '',
        color: 'white',
        scroll: false,
        slider: true,
        width: '2',
        height: '2'
    }

});
