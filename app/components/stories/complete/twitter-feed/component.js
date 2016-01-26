import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'Twitter Feed',
        subTitle: 'What are we tweeting about?',
        slider: true,
        dataSourceUrl: 'http://twitter.com/leedsdatamill',
        feedbackEmail: 'mark@hebeworks.com',
        description: 'This is the main Twitter feed from Leeds Data Mill.',
        author: 'Mark Barrett',
        width: '2'
    },
    
    selectedMonth: '',
    tweets: [],

    didInsertElement: function () {
        var obj = this;

        var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
        this.getData(hebeNodeAPI + '/twitter')
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
                }
                tweets.push(tweet);
            });
            obj.set('tweets', tweets);

            setTimeout(function () { obj.set('loaded', true); })
        },
        function (error) {
            // debugger;
        });

    }
});
