import DS from 'ember-data';
import config from 'hebe-dash/config/environment';

export default DS.RESTAdapter.extend({
    host: config.APP.statnoticeURL,
    namespace: 'api',
//    pathForType: function (type) {
//        var path = this._super(type);
//        if (path == 'canvas') {
//            path = 'canvases';
//        }
//        return Ember.String.underscore(path);
//    }    
});
