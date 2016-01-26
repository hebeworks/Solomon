import Ember from 'ember';
import config from 'hebe-dash/config/environment';

export default Ember.Mixin.create({
	Config: config.APP,
	getData: function (url, cache) {
		return this.get('appSettings').getData(url, cache);
	}
});
