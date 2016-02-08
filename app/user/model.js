import DS from 'ember-data';

export default DS.Model.extend({
  	username: DS.attr('string'),
  	configJSON: DS.attr('string'),

	serializeConfigToJSON: function (config) {
		var json = '';
		if (config != null) {
			json = JSON.stringify(config);
		}
		return json;
	},

	_config: {},
	config: Ember.computed({
		get() {
			if ((Ember.isEmpty(this.get('_config')) || Ember.keys(this.get('_config')).length === 0)
					&& !Ember.isEmpty(this.get('configJSON'))) {
				var configJSON = this.get('configJSON');
				var config = JSON.parse(configJSON);
				if(Ember.isEmpty(config)){
					config = {};
				}
				this.set('_config', config);
			}
			return this.get('_config');
		},
		set(key, value) {
			if(!Ember.isEqual(this.get('_config'),value)) {
				this.set('_config', value);
			}
			if (!Ember.isEmpty(value)) {
				var json = this.serializeConfigToJSON(value);
				this.set('configJSON', json);
			}
			return value;
		}
	})

});
