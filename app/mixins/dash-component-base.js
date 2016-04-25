import Ember from 'ember';
import config from 'hebe-dash/config/environment';

export default Ember.Mixin.create({
  Config: config.APP,
  postData: function postData(url, data, authenticated) {
    return this.get('appSettings').getData(url, false, 'POST', data, authenticated);
  },
  getData: function getData(url, cache, authenticated, data) {
    return this.get('appSettings').getData(url, cache, 'GET', data, authenticated);
  },
});
