/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DatamillStory.extend(EditableFields, {
    storyConfig: {
        title: 'Leeds Gov News',
        subTitle: 'New from Leeds',
        color: 'medium-blue',
        authorImage: '/assets/img/LeedsCouncilLogo.png'
    },

    editableFields: [
        {
            name: 'url',
            type: 'text',
            value: '',
            placeholder: 'Enter a URL'
        }
    ],

    storyModel: null,

    onConfigChange: function () {
        this.loadFeedFromConfig();
        this.set('action','saveCanvasState');
        this.sendAction('action');
    }.observes('storyModel.config.@each.value'),

    loadFeedFromConfig: function() {
        var feedUrl = this.fetchEditableFieldValue('url');
        if (!Ember.isEmpty(feedUrl)) {
            this.loadFeed(feedUrl);
        } else {
            this.loadFeed('http://news.leeds.gov.uk/feed/en');
        }
    }.on('init'),

    loadFeed: function (feedUrl) {
        var obj = this;
        var base64FeedUrl = hebeutils.Base64.encode(feedUrl);
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        var url = hebeNodeAPI + '/apiproxy?url=' + base64FeedUrl + '&toJSON=true';
        this.getData(url)
            .then(
                function (data) {
                    // success
                    console.log('rss-leeds-gov > getData > success');
                    // data is the response Object/Array from the AJAX request
                    var items = [];
                    data.rss.channel[0].item.forEach((tmpItem) => {
                        var image = '';

                        try {
                            image = tmpItem.enclosure[0].$.url;
                        } catch (err) {

                        }

                        var item = {
                            id: tmpItem.guid,
                            title: tmpItem.title,
                            description: tmpItem.description,
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
