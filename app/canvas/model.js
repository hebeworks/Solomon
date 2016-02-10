import DS from 'ember-data';
import Ember from 'ember';

var canvas = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	shortcode: DS.attr('string'),
	friendlyURL: DS.attr('string'),
	categories: DS.hasMany('category', { async: true }),
	userID: DS.attr('string'),
	storiesJSON: DS.attr('string'),
	authorName: DS.attr('string'),
	twitterName: DS.attr('string'),

	onStoriesChanged: function () {
		/* WORKS
		stories = [].pushObject(this.store.createRecord('story',{title:'test'}))
		this.store.serialize(stories)
		*/
		var stories = this.get('stories');
		stories.forEach(function(story) {
			story.onConfigChanged();
		});
		var json = this.serializeStoriesToJSON(stories);
		this.set('storiesJSON', json);

	}.observes('stories.@each'),

	save: function (options) {
		// make sure to JSON Serialize the current state of stories
		// in case anything has changed that wasn't picked up
		// by the onStoriesChanged observer
		this.onStoriesChanged();
		return this._super(options);
	},

	serializeStoriesToJSON: function (stories) {
		var json = '';
		if (stories != null) {
			var arr = [];
			var store = this.store;
			stories.forEach(function (story) {
				var tmp = store.serialize(story, { includeId: true });
				arr.push(tmp.data);
				// arr.push(store.serialize(story, { includeId: false }));
			});
			var json = JSON.stringify({ data: arr });
		}
		return json;
	},

	_stories: null,
    // todo: change canvas.stories to a computed property from JSON to allow for more than one of the same object
	//http://discuss.emberjs.com/t/the-same-object-in-a-hasmany-relationship/7621/2
	// stories: DS.hasMany('story', { async: true }),
	stories: Ember.computed({
		get() {
			// var test = this.store.createRecord('story',{title:'test story 1'});
			if (this.get('_stories') == null && !Ember.isEmpty(this.get('storiesJSON'))) {
				var storyJSON = this.get('storiesJSON');
				storyJSON = JSON.parse(storyJSON);
				var store = this.store;
				var stories = Ember.A();
				storyJSON.data.forEach(function (story) {
					// this.store.pushPayload('story', storyJSON); old method
					// var tmp = store.push(story); // want to use this but can't due to pluralized model names in serialization

					// var tmp = store.push('story',story); // base working method - but doesn't seem to keep individual obj attributes
					// just points to the singular model in store
					// prevents adding multiple of same
					// story.type = story.type.singularize()
					story.attributes.id = hebeutils.guid();
					story.type = 'story';
					var attributes = story.attributes;
					$.extend(story, attributes);
					delete story.attributes;
					var tmp = store.createRecord('story', story);

					var catIDs = story.relationships.categories.data.map(function (item) {
						return item.id;
					});

					catIDs.forEach(function(id){
						store
							.find('category',id)
								.then(function(item){
									tmp.get('categories').pushObject(item); })
					});
					stories.pushObject(tmp);

				});
				this.set('_stories', stories);
				if (Ember.isArray(stories)) {
					// sort stories by canvasOrderIndex
					var sortedStories = stories.sortBy("canvasOrderIndex");
					return sortedStories;
				}
				// return Ember.A();
			}
			return Ember.A();
		},
		set(key, value) {
			this.set('_stories', value);
			if (!Ember.isEmpty(value)) {
				var json = this.serializeStoriesToJSON(value);
				this.set('storiesJSON', json);
			}
			return value;
		}
	})

});

export default canvas;
