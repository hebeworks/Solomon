/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DatamillStory.extend(EditableFields, {

    storyModel: null,

    loading: true,

    defaultFeedURL: 'http://news.leeds.gov.uk/feed/en',

    storyConfig: {
        title: 'Leeds Gov News',
        subTitle: 'New from Leeds',
        color: 'medium-blue',
        authorImage: '/assets/img/LeedsCouncilLogo.png'
    },

    editableFields: function(){
        return [
            {
                name: 'url',
                type: 'text',
                value: '',
                placeholder: 'Enter a URL'
            }
        ]
    }.property('storyModel'),

    feedURL: function(){
        var url = this.fetchEditableFieldValue('url');
        var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

        return valid ? url : this.get('defaultFeedURL');
    }.property('storyModel.config.@each.value'),

    setupFeed: function(){
        this.loadFeed(this.get('feedURL'));
    }.on('init').observes('feedURL'),

    loadFeed: function (feedUrl){
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        var url = hebeNodeAPI + '/apiproxy?url=' + hebeutils.Base64.encode(feedUrl) + '&toJSON=true';

        this.set('items', []);
        this.set('loading', true);

        this.getData(url).then(
            function(data) {
                var items = [];

                data.rss.channel[0].item.forEach((tmpItem) => {
                    var image = '';

                    try {
                        image = tmpItem.enclosure[0].$.url;
                    } catch (err) {}

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

                console.log('RSS Generic : Data loaded.', items);

                this.set('items', items);
            }.bind(this)
        ).finally(function (){
            this.set('loading', false);
        }.bind(this));
    }

});
