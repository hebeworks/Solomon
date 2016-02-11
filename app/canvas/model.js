import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  _stories: null,

  title: DS.attr('string'),

  description: DS.attr('string'),

  shortcode: DS.attr('string'),

  friendlyURL: DS.attr('string'),

  categories: DS.hasMany('category', { async: true }),

  userID: DS.attr('string'),

  storiesJSON: DS.attr('string'),

  authorName: DS.attr('string'),

  twitterName: DS.attr('string'),

  stories: Ember.computed({

    get(){
      if (this.get('_stories') == null && !Ember.isEmpty(this.get('storiesJSON'))) {
        var storyJSON = JSON.parse(this.get('storiesJSON'));
        var store = this.store;
        var stories = Ember.A();

        storyJSON.data.forEach(function (story) {
          story.attributes.id = hebeutils.guid();
          story.type = 'story';

          var attributes = story.attributes;
          $.extend(story, attributes);
          delete story.attributes;

          var tmp = store.createRecord('story', story);

          var catIDs = story.relationships.categories.data.map(function(item){
            return item.id;
          });

          catIDs.forEach(function(id){
            store
              .find('category',id)
              .then(function(item){
                tmp.get('categories').pushObject(item);
              });
          });

          stories.pushObject(tmp);
        });

        this.set('_stories', stories);

        if (Ember.isArray(stories)) {
          return stories.sortBy("canvasOrderIndex");
        }

        return Ember.A();
      }

      return Ember.A();
    },

    set(key, value){
      this.set('_stories', value);

      if (!Ember.isEmpty(value)){
        this.set('storiesJSON', this.serializeStoriesToJSON(value));
      }

      return value;
    }

  }),

  onStoriesChanged: function () {
    var stories = this.get('stories');

    stories.forEach(function(story){
      story.onConfigChanged();
    });

    this.set('storiesJSON', this.serializeStoriesToJSON(stories));
  }.observes('stories.@each', 'stories.@each.configJSON'),

  serializeStoriesToJSON: function (stories){
    if(!stories)
      return '';

    var store = this.store;
    var items = [];

    stories.forEach(function (story) {
      var tmp = store.serialize(story, {
        includeId: true
      });

      items.push(tmp.data);
    });

    return JSON.stringify({ data: items });
  }

});
