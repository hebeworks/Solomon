import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
        title: 'Twitter Feed',
        subTitle: 'What are we tweeting about?',
        slider: false,
        dataSourceUrl: 'http://twitter.com/yorkshirewater',
        // feedbackEmail: 'mark@hebeworks.com',
        description: 'This is the main Twitter feed from Yorkshire Water.',
        // author: 'Nathan Smith',
        viewOnly: true,
        width: '2'
    },

    tweets: [],
    editableFields: [
        {
            name: 'twitter_user',
            type: 'text',
            value: '',
            placeholder: 'Twitter Username'
        },
        {
            name: 'title',
            type: 'text',
            value: 'Twitter Feed',
            placeholder: 'Story Title'
        },
        {
            name: 'sub_title',
            type: 'text',
            value: 'What are we tweeting about?',
            placeholder: 'Story Subtitle'
        },
        {
            name: 'description',
            type: 'text',
            value: 'This is the main Twitter feed from Yorkshire Water.',
            placeholder: 'Story Subtitle'
        }
    ],
    
    onEditableFields: function() {
        this.setProperties({
            'storyConfig.title': this.fetchEditableFieldValue('title'),
            'storyConfig.subTitle': this.fetchEditableFieldValue('sub_title'),
            'storyConfig.dataSourceUrl': 'http://twitter.com/' + this.fetchEditableFieldValue('twitter_user'),
            'storyConfig.description': this.fetchEditableFieldValue('description')
        });
    }.observes('storyModel.config.@each.value'),
    
    twitterUser: Ember.computed('storyModel.config.@each.value', {
        get() {
            var editedVal = this.fetchEditableFieldValue('twitter_user');
            return editedVal ? editedVal : 'YorkshireWater'; // Todo: the initial YW story expects this as default
        }
    }),

    onInsertElement: function () {
        var obj = this;
        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        var twitterUser = this.get('twitterUser');
        if(!Ember.isEmpty(twitterUser)) {
        this.getData(hebeNodeAPI + '/twitter/' + twitterUser)
            .then(function (data) {
                var tweets = [];
                data.tweets.forEach(function (item) {
                    var friendly_date = moment(item.created_at).fromNow();
                    var tweet = {
                        date: item.created_at,
                        friendly_date: friendly_date,
                        id: item.id,
                        text: item.text,
                        user_name: item.user.name,
                        user_description: item.user.description,
                        user_url: item.user.url
                    };
                    tweets.push(tweet);
                });
                obj.set('tweets', tweets);

                setTimeout(function () { obj.set('loaded', true); })
            },
                function (error) {
                    // debugger;
                });
        }
    }.on('didInsertElement').observes('twitterUser')
});
