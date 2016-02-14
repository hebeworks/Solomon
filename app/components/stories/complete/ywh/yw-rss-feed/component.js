/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
        title: 'Yorkshire Water News',
        subTitle: 'The latest from Yorkshire Water',
        color: 'white',
        // color: 'medium-blue',
        // headerImage: '/assets/img/lcc-logo.png',
        author: 'Yorkshire Water'
    },
    
    storyModel: null,

    onYWRSSDidReceiveAttrs: function () {
        this.loadFeed('https://www.yorkshirewater.com/rss.xml');
    }.on('didReceiveAttrs'),

    loadFeed: function (feedUrl) {
        var obj = this;
        var base64FeedUrl = hebeutils.Base64.encode(feedUrl);
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        var url = hebeNodeAPI + '/apiproxy?url=' + base64FeedUrl + '&toJSON=true';
        this.getData(url)
            .then(
                function (data) {
                    var items = [];
                    data.rss.channel[0].item.forEach((tmpItem) => {
                        var image = '';
                        try {
                            // image = $('<div>').html(tmpItem.description).find('.field-name-field-hero-image:first img').attr('src');
                        } catch (err) {

                        }
                        
                        var item = {
                            id: tmpItem.guid,
                            title: tmpItem.title,
                            description: $('<div>').html(tmpItem.description).find('.field-type-text-long').text().trim().substr(0,255),
                            image: image,
                            link: tmpItem.link,
                            pubDate: tmpItem.pubDate
                        };

                        items.push(item);
                    });
                    obj.set('items', items);
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function (error) {
                    // failure
                    console.log('rss-leeds-gov > getData > error: ' + error);
                },
                function () {
                    // complete
                }
                )
    }
});
