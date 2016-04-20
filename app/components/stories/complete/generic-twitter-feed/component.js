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
    showLoading: true
  },

  tweets: [],
  editableFields: [
    {
      name: 'twitter_user',
      type: 'text',
      value: '',
      placeholder: 'Twitter Username',
    },
  ],

  onEditableFields: function() {
    this.setProperties({
      'storyConfig.dataSourceUrl': 'http://twitter.com/' + this.fetchEditableFieldValue('twitter_user')
    });
  }.observes('storyModel.config.@each.value'),

  twitterUser: Ember.computed('storyModel.config.@each.value', {
    get() {
      const editedVal = this.fetchEditableFieldValue('twitter_user');
      return editedVal || ''; // Todo: the initial YW 'YorkshireWater' story expects this as default
    },
  }),

  onInsertElement: function () {
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
              console.log(`tweet --${item.text}-- has media`);
              
              tweetMedia.forEach(function(item) {
                
                // The URL to check the string for
                const url = item.url;
                
                // The path to the media item
                const path = item.media_url;
                
                // The URL of the media item's tweet
                const mediaTweet = item.expanded_url;
                
                // Check the tweet text for the url
                if (tweetText.indexOf(url) > -1) {
                  if (item.type === 'photo') {
                    
                    // Create the image markup
                    const img = `<a cpn-tweet_media href="${mediaTweet}" target="_blank"><img src="${path}:small" alt=""></a>`;
                    
                    // Find the URL and replace with the marup
                    tweetText = tweetText.split(url).join(img);
                  }
                }
              });
            }
            
            // Check if the tweet has any URLs
            if (!Ember.isEmpty(tweetUrls)) {
              console.log(`tweet --${item.text}-- has urls`);
            }
            
            // Check if the tweet has any hashtags
            if (!Ember.isEmpty(tweetHashtags)) {
              console.log(`tweet --${item.text}-- has hashtags`);
            }
            
            // Check if the tweet has any hashtags
            if (!Ember.isEmpty(tweetMentions)) {
              console.log(`tweet --${item.text}-- has metions`);
            }
            
            
            const friendly_date = moment(item.created_at).fromNow();
            const tweet = {
                friendly_date: friendly_date,
                tweet_id: item.id_str,
                text: tweetText,
                user_real_name: item.user.name,
                user_username: item.user.screen_name,
                user_avatar_url: item.user.profile_image_url,
                user_id: item.user
            };
            tweets.push(tweet);
          });
          obj.set('tweets', tweets);
          console.log(tweets);

          setTimeout(function () {
            obj.set('loaded', true);
            Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
          });
        },
        function (error) {
            // debugger;
        });
    }
  }.on('didInsertElement').observes('twitterUser')
});
