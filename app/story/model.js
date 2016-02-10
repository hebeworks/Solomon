import DS from 'ember-data';
import Ember from 'ember';

export default  DS.Model.extend({

  title: DS.attr('string'),

  categories: DS.hasMany('category', { async: true }),

  canvasOrderIndex: DS.attr('number'),

  storyType: DS.attr('string'),

  configJSON: DS.attr('string'),

  _config: null,

  config: Ember.computed({

    get(){
      if (this.get('_config') == null && !Ember.isEmpty(this.get('configJSON'))){
        var configJSON = this.get('configJSON');

        try {
          configJSON = JSON.parse(configJSON);

          var store = this.store;
          var config = Ember.A();

          configJSON.data.forEach(function (item) {
              item.attributes.id = hebeutils.guid();

              config.pushObject(
                store.createRecord('story/configItem', item.attributes)
              );
          });

          this.set('_config', config);

          if (Ember.isArray(config)){
            return config.sortBy("canvasOrderIndex");
          }
        } catch(err) {
            return Ember.A();
        }
      }

      return Ember.A();
    },

    set(key, value){
      this.set('_config', value);

      if (!Ember.isEmpty(value)){
        this.set('configJSON', this.serializeConfigToJSON(value));
      }

      return value;
    }

  }),

  componentPath: Ember.computed('storyType', {
    get(){
      if (!Ember.isEmpty(this.get('storyType'))){
        return this.get('storyType').toString().ensureStartingString('stories/complete/');
      }
      else {
        return '';
      }
    }
  }),

	addConfigItem: function (obj) {
		var config = this.get('config');
		var existingConfig = config.findBy('name', obj.name);

		if (Ember.isEmpty(existingConfig)){
			config.push(
        this.store.createRecord('story/configItem', obj)
      );
		}
	},

  onConfigChanged: function (){
		var config = this.get('config');
		var serialized = this.serializeConfigToJSON(config);

		this.set('configJSON', serialized);

		config.forEach(function(item){
      var name = item.get('name');
      var value = item.get('value');

			if(this.get(name) !== value){
				this.set(name, value);
			}
		}.bind(this));
	}.observes('config.@each.value').on('ready'),

	serializeConfigToJSON: function(config){
    if(!config)
      return '';

		var store = this.store;
    var items = [];

		config.forEach(function (config) {
			var tmp = store.serialize(config, {
        includeId: true
      });

			items.push(tmp.data);
		});

		return JSON.stringify({ data: items });
	}

});
