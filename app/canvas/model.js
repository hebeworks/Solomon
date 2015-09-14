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
		
		if(stories != null) {
			var arr = [];
			var store = this.store;
			stories.forEach(function (story) {
				var tmp = store.serialize(story, { includeId: true });
				// debugger;
				arr.push(tmp.data);
				// arr.push(store.serialize(story, { includeId: false }));
			});
			var json = JSON.stringify({ data: arr });
			this.set('storiesJSON', json);
		} else {
			this.set('storiesJSON', '');
		}
	}.observes('stories.@each'),

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
				storyJSON.data.forEach(function(story){
					// this.store.pushPayload('story', storyJSON);
					var tmp = store.push('story', story);
					stories.pushObject(tmp);
				});
				this.set('_stories', stories);
				if (Ember.isArray(stories)) {
					return stories;
				}
				// return Ember.A();
			}
			return Ember.A();
		},
		set(key, value) {
			// debugger;
			// var _stories = this.get('_stories');
			if (!Ember.isEmpty(this.get('_stories'))) {
				var json = JSON.stringify(this.store.serialize(value));
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