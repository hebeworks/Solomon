/* globals moment */

import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
  initialConfig: {
    title: 'Twitter',
    subTitle: '',
    slider: false,
    dataSourceUrl: '',
    // feedbackEmail: 'mark@hebeworks.com',
    description: 'This is the main Twitter feed.',
    // author: 'Nathan Smith',
    viewOnly: true,
    width: '2',
    showHeaderBorder: false,
    showLoading: true,
  },

  tweets: [],
  editableFields: [
    {
      name: 'story_title',
      type: 'text',
      value: 'Twitter',
      placeholder: 'Story title',
    },
    {
      name: 'twitter_user',
      type: 'text',
      value: '',
      placeholder: 'Twitter username',
    },
  ],

  showVideoPlayer: false,
  videoSources: null,

  onEditableFields: function() {
    this.setProperties({
      'storyConfig.title': this.fetchEditableFieldValue('story_title')
    });
  }.on('didInsertElement').observes('storyModel.config.@each.value'),

  twitterUser: Ember.computed('storyModel.config.@each.value', {
    get() {
      const editedVal = this.fetchEditableFieldValue('twitter_user');
      return editedVal || ''; // Todo: the initial YW 'YorkshireWater' story expects this as default
    },
  }),

  onInit: function() {
    if (this.get('twitterUser')) {
      this.set('loaded', false);
    } else {
      this.set('loaded', true);
    }
  }.on('init'),

  onInsertElement: function() {
    this.setTweets();
  }.on('didInsertElement'),

  onTwitterUser: function() {
    Ember.run.debounce(this, this.setTweets, 500);
  }.observes('twitterUser'),

  setTweets: function() {
    const obj = this;
    const hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
    const twitterUser = this.get('twitterUser');
    if (!Ember.isEmpty(twitterUser)) {
      this.getData(hebeNodeAPI + '/twitter/' + twitterUser)
        .then(function (data) {
          const tweets = [];
          data.tweets.forEach(function (item) {

            // The tweet text with no string replacements
            var tweetText = item.text;
            var tweetMedia = null;
            if (item.extended_entities) {
              tweetMedia = item.extended_entities.media;
            }
            const tweetUrls = item.entities.urls;
            const tweetHashtags = item.entities.hashtags;
            const tweetMentions = item.entities.user_mentions;

            // Check if the tweet has any media attached
            if (tweetMedia) {
              tweetMedia.forEach(function(item) {

                // The URL to check the string for
                const url = item.url;

                // The URL of the media item's tweet
                const mediaTweet = item.expanded_url;

                // Check the tweet text for the url
                if (tweetText.indexOf(url) > -1) {

                  // Find the URL and remove from the string
                  tweetText = tweetText.split(url).join('');
                }
              });
            }

            // Check if the tweet has any URLs
            if (!Ember.isEmpty(tweetUrls)) {
              tweetUrls.forEach(function(item) {

                // The URL to check the string for
                const url = item.url;

                // Check the tweet text for the url
                if (tweetText.indexOf(url) > -1) {

                  // Create the link markup
                  const link = `<a href="${url}" target="_blank">${url}</a>`;

                  // Find the URL and replace with the markup
                  tweetText = tweetText.split(url).join(link);
                }
              });
            }

            // Check if the tweet has any hashtags
            if (!Ember.isEmpty(tweetHashtags)) {
              tweetHashtags.forEach(function(item) {

                // The hashtag to check the string for
                const hashtag = `#${item.text}`;

                // Check the tweet text for the url
                if (tweetText.indexOf(hashtag) > -1) {

                  // Create the link markup
                  const link = `<a href="https://twitter.com/hashtag/${item.text}?src=hash" target="_blank">${hashtag}</a>`;

                  // Find the URL and replace with the markup
                  tweetText = tweetText.split(hashtag).join(link);
                }
              });
            }

            // Check if the tweet has any mentions
            if (!Ember.isEmpty(tweetMentions)) {
              tweetMentions.forEach(function(item) {

                // The username to check the string for
                const username = `@${item.screen_name}`;

                // Convert username to lowercase for searching in tweet text
                const lowercaseUsername = item.screen_name.toLowerCase();

                // Replace all username instances with the correctly cased version
                tweetText = tweetText.replace(new RegExp(`@${lowercaseUsername}`, 'ig'), username);

                // Check the tweet text for the url
                if (tweetText.indexOf(username) > -1) {

                  // Create the link markup
                  const link = `<a href="https://twitter.com/${item.screen_name}" target="_blank">${username}</a>`;

                  // Find the URL and replace with the markup
                  tweetText = tweetText.split(username).join(link);
                }
              });
            }

            // Get how long ago the tweet was created
            const friendly_date = moment(item.created_at).fromNow();

            // Get the larger version of the user's avatar
            const avatar = item.user.profile_image_url.split('normal').join('bigger');

            const tweet = {
                friendly_date: friendly_date,
                tweet_id: item.id_str,
                text: tweetText,
                user_real_name: item.user.name,
                user_username: item.user.screen_name,
                user_avatar_url: avatar,
                user_id: item.user,
                photos: [],
                videos: []
            };

            if (tweetMedia) {
              tweetMedia.forEach(function(item) {
                if (item.type === 'photo') {
                  const photo = {
                    src: item.media_url_https,
                    url: item.url
                  }

                  tweet.photos.push(photo);
                }

                if (item.type === 'video' || item.type === 'animated_gif') {
                  const video = {
                    img_src: item.media_url_https,
                    src: item.video_info.variants.reverse(),
                    url: item.url
                  }

                  tweet.videos.push(video);
                }
              });
            }

            tweets.push(tweet);
          });
          obj.set('tweets', tweets);
          console.log(tweets);

          setTimeout(function () {
            obj.set('loaded', true);
            Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
          });
        },
        function (error) {});
    }
  },

  actions: {
    playVideo: function(sources) {
      this.set('showVideoPlayer', true);

      const renamedSources = [];

      sources.forEach(function(item) {
        const source = {
          src: item.url,
          type: item.content_type
        }

        renamedSources.push(source);
      });

      this.set('videoSources', renamedSources);
      this.set('storyConfig.customProperties', 'video-is-open');
      this.set('storyConfig.scroll', false);
      Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
      console.log('videos');
      console.log(sources);
    },

    closeVideo: function() {
      this.set('showVideoPlayer', false);
      this.set('videoSources', null);
      this.set('storyConfig.customProperties', null);
      this.set('storyConfig.scroll', true);
    }
  }
});
