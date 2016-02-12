/* global Ember, hebeutils, _ */
import RSSGeneric from '../rss-generic/component';

export default RSSGeneric.extend({

    defaultFeedURL: 'https://www.google.com/alerts/feeds/14130490369006860511/11463334997055244251',

    storyConfig: {
        title: 'RTT News',
        subTitle: 'Live RTT related news stories',
        color: 'medium-blue'
    }

});
