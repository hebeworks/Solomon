import DS from 'ember-data';
import Ember from 'ember';

var story = DS.Model.extend({
    title: DS.attr('string'),
    storyType: DS.attr('string'),
    componentPath: Ember.computed('storyType', {
        get() {
            if (!Ember.isEmpty(this.get('storyType'))) {
                return this.get('storyType').toString().ensureStartingString('stories/complete/');
            }
            return "";
        }
    }),

    categories: DS.hasMany('category', { async: true }),
    canvasOrderIndex: DS.attr('number'),


	addConfigItem: function (obj) {
		var config = this.get('config');
		var existingConfig = config.findBy('name', obj.name);
		if (Ember.isEmpty(existingConfig)) {
			var tmp = this.store.createRecord('story/configItem', obj);
			config.push(tmp);
		}
	},

	onConfigChanged: function () {
		var config = this.get('config');
		var json = JSON.stringify(config);
		this.set('configJSON', json);
	}.observes('_config.@each.value'),

    configJSON: DS.attr('string'),
	_config: [],
	config: Ember.computed({
		get() {
			if (this.get('_config') == null && !Ember.isEmpty(this.get('configJSON'))) {
				var configJSON = this.get('configJSON');
				var config = JSON.parse(configJSON);
				this.set('_config', config);
                return config;
			}
			return this.get('_config');
		},
		set(key, value) {
			this.set('_config', value);
			var json = JSON.stringify(value);
			this.set('configJSON', json);
			return value;
		}
	}),
    
	// onConfigChanged: function () {
	// 	alert('Changed');
	// 	var config = this.get('config');
		
	// 	if(config != null) {
	// 		var json = JSON.stringify(config);
	// 		this.set('configJSON', json);
	// 	} else {
	// 		this.set('configJSON', JSON.stringify([]));
	// 	}
	// 	return true;
	// },

});

export default story;