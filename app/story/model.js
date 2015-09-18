import DS from 'ember-data';
import Ember from 'ember';

var story = DS.Model.extend({
    title: DS.attr('string'),
    categories: DS.hasMany('category', { async: true }),
    canvasOrderIndex: DS.attr('number'),
    storyType: DS.attr('string'),
	configJSON: DS.attr('string'),

    componentPath: Ember.computed('storyType', {
        get() {
            if (!Ember.isEmpty(this.get('storyType'))) {
                return this.get('storyType').toString().ensureStartingString('stories/complete/');
            }
            return "";
        }
    }),

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
		var json = this.serializeConfigToJSON(config);
		this.set('configJSON', json);
	}.observes('config.@each.value'),

	serializeConfigToJSON: function (config) {
		var json = '';
		if (config != null) {
			var arr = [];
			var store = this.store;
			config.forEach(function (config) {
				var tmp = store.serialize(config, { includeId: true });
				arr.push(tmp.data);
				// arr.push(store.serialize(config, { includeId: false }));
			});
			var json = JSON.stringify({ data: arr });
		}
		return json;
	},

	_config: null,
    // todo: change canvas.config to a computed property from JSON to allow for more than one of the same object
	//http://discuss.emberjs.com/t/the-same-object-in-a-hasmany-relationship/7621/2
	// config: DS.hasMany('config', { async: true }),
	config: Ember.computed({
		get() {
			// var test = this.store.createRecord('config',{title:'test config 1'});
			if (this.get('_config') == null && !Ember.isEmpty(this.get('configJSON'))) {
				var configJSON = this.get('configJSON');
				configJSON = JSON.parse(configJSON);
				var store = this.store;
				var config = Ember.A();

				configJSON.data.forEach(function (configItem) {
					// this.store.pushPayload('config', configJSON); old method
					// var tmp = store.push(config); // want to use this but can't due to pluralized model names in serialization
					
					// var tmp = store.push('config',config); // base working method - but doesn't seem to keep individual obj attributes 
					// just points to the singular model in store 
					// prevents adding multiple of same 
					// config.type = config.type.singularize()
					configItem.attributes.id = hebeutils.guid();
					var tmp = store.createRecord('story/configItem', configItem.attributes);

					config.pushObject(tmp);
				});
				this.set('_config', config);
				if (Ember.isArray(config)) {
					// sort config by canvasOrderIndex
					var sortedConfig = config.sortBy("canvasOrderIndex");
					return sortedConfig;
				}
				// return Ember.A();
			}
			return Ember.A();
		},
		set(key, value) {
			this.set('_config', value);
			if (!Ember.isEmpty(value)) {
				var json = this.serializeConfigToJSON(value);
				this.set('configJSON', json);
			}
			return value;
		}
	}),

});

export default story;