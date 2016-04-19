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
    {
      name: 'description',
      type: 'text',
      value: "This is what we're tweeting.",
      placeholder: 'Story Subtitle',
    },
  ],

  onEditableFields: function() {
    this.setProperties({
      'storyConfig.dataSourceUrl': 'http://twitter.com/' + this.fetchEditableFieldValue('twitter_user'),
      'storyConfig.description': this.fetchEditableFieldValue('description'),
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
            const friendly_date = moment(item.created_at).fromNow();
            const tweet = {
                friendly_date: friendly_date,
                tweet_id: item.id_str,
                text: item.text,
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
