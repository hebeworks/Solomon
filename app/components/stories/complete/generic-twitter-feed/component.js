/* globals moment */

import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
  initialConfig: {
    title: 'Twitter Feed',
    subTitle: 'What are we tweeting about?',
    slider: false,
    dataSourceUrl: '',
    // feedbackEmail: 'mark@hebeworks.com',
    description: 'This is the main Twitter feed.',
    // author: 'Nathan Smith',
    viewOnly: true,
    width: '2',
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
      name: 'title',
      type: 'text',
      value: 'Twitter Feed',
      placeholder: 'Story Title',
    },
    {
      name: 'sub_title',
      type: 'text',
      value: 'What are we tweeting about?',
      placeholder: 'Story Subtitle',
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
      'storyConfig.title': this.fetchEditableFieldValue('title'),
      'storyConfig.subTitle': this.fetchEditableFieldValue('sub_title'),
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

          setTimeout(function () { obj.set('loaded', true); });
        },
        function (error) {
            // debugger;
        });
    }
  }.on('didInsertElement').observes('twitterUser')
});
