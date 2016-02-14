/* global Ember, hebeutils, _ */
import RSSGeneric from '../rss-generic/component';

export default RSSGeneric.extend({

    defaultFeedURL: 'http://www.nhs.uk/NHSChoices/shared/RSSFeedGenerator/RSSFeed.aspx?site=News',

    setSliderLoadedState: function(){
      Ember.run.next(this, function(){
        this.set('loaded', !this.get('loading'));
      });
    }.observes('loading'),

    initialConfig: {
        title: 'Behind the headlines',
        subTitle: '',
        color: 'white',
        scroll: false,
        slider: true,
        width: '2',
        height: '2'
    },
    
    truncateText: function() {
        this.$('[cpn-story_carousel-item] h3, [cpn-story_carousel-item] div *:first-child + *').dotdotdot({watch: true});
    }.observes('loaded')

});
