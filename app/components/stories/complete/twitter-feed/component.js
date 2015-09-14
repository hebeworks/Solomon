import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    tweets: [],

    didInsertElement: function () {
        this.set('title', 'Twitter Feed');
        this.set('subTitle', 'What are we tweeting about?');
        var obj = this;

        this.getData('http://hebenodeapi.azurewebsites.net/twitter')
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
