import DS from 'ember-data';
import Ember from 'ember';

var canvas = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	shortcode: DS.attr('string'),
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
		var json = this.serializeStoriesToJSON(stories);
		this.set('storiesJSON', json);

	}.observes('stories.@each'),

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
					var tmp = store.createRecord('story',story.attributes);
					
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
	}),

	urlShortcode: Ember.computed('shortcode', {
		get() {
			if (this.get('shortcode') == null && Ember.isEmpty(this.get('shortcode'))) {
				var id = this.get('id');
				var code = hebeutils.shortcode.randomString(6);
				this.set('shortcode', code);
				this.save();
			}
			return this.get('shortcode');
		},
		set(key, value) {
			if (value != this.get('shortcode')) {
				this.set('shortcode', value);
			}
			return value;
		}
	}),

});

export default canvas;