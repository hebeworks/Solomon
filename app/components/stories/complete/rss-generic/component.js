/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DatamillStory.extend(EditableFields, {

    storyModel: null,

    loading: true,

    defaultFeedURL: 'http://news.leeds.gov.uk/feed/en',

    initialConfig: {
        title: 'Leeds Gov News',
        subTitle: 'New from Leeds',
        color: 'medium-blue',
        authorImage: '/assets/img/LeedsCouncilLogo.png',
        viewOnly: true
    },

    editableFields: function () {
        return [
            {
                name: 'title',
                type: 'text',
                value: '',
                placeholder: 'Enter a story title'
            },
            {
                name: 'sub_title',
                type: 'text',
                value: '',
                placeholder: 'Enter a story sub title'
            },
            {
                name: 'url',
                type: 'text',
                value: '',
                placeholder: 'Enter a URL'
            },
            {
                name: 'limit',
                type: 'text',
                value: '',
                placeholder: 'Enter a limit (e.g. "5")'
            },
            {
                name: 'story_colour',
                type: 'enum',
                sourceContent: JSON.stringify([{ text: 'white', id: 'white' }, { text: 'medium-blue', id: 'medium-blue' }]),
                value: '',
                placeholder: 'Choose a story colour'
            }
        ];
    }.property('storyModel'),

    limit: function () {
        return this.fetchEditableFieldValue('limit');
    }.property('storyModel.config.@each.value'),

    onConfigChanged: function () {
        var title = this.fetchEditableFieldValue('title');
        if (!Ember.isEmpty(title)) {
            this.set('storyConfig.title', title);
        }
        
        var subTitle = this.fetchEditableFieldValue('sub_title');
        if (!Ember.isEmpty(subTitle)) {
            this.set('storyConfig.subTitle', subTitle);
        }
        
        var colour = this.fetchEditableFieldValue('story_colour');
        if (!Ember.isEmpty(colour)) {
            this.set('storyConfig.color', colour);
        }
    }.on('didInsertElement').observes('storyModel.config.@each.value'),

    feedURL: function () {
        var url = this.fetchEditableFieldValue('url');
        var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        return valid ? url : this.get('defaultFeedURL');
    }.property('storyModel.config.@each.value'),

    setupFeed: function () {
        this.loadFeed(this.get('feedURL'));
    }.on('init').observes('feedURL'),

    loadFeed: function (feedUrl) {
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        var url = hebeNodeAPI + '/apiproxy?url=' + hebeutils.Base64.encode(feedUrl) + '&toJSON=true';

        this.set('items', []);
        this.set('loading', true);
        this.set('error', null);

        this.getData(url).then(
            function (data) {
                var feed = Ember.ObjectProxy.create(data);
                var content = feed.get('rss.channel.firstObject.item');

                if (Ember.isEmpty(content)) {
                    return this.set('error', "Failed to load data from " + this.get('feedURL') + ".");
                }

                var items = [];

                content.forEach(function (tmpItem) {
                    var image = '';

                    try {
                        image = tmpItem.enclosure[0].$.url;
                    } catch (err) { }

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

                var limit = this.get('limit');

                this.set('items', limit ? items.slice(0, Number(limit)) : items);
            }.bind(this)
            ).finally(function () {
                this.set('loading', false);
            }.bind(this));
    }

});
