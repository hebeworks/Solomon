import DS from 'ember-data';
import config from 'hebe-dash/config/environment';

// export default DS.RESTAdapter.extend({
export default DS.JSONAPIAdapter.extend({
    host: config.APP.dashAPIURL,
    namespace: 'api',
    // updateRecord: function (store, type, snapshot) {
    //     var data = {};
    //     var serializer = store.serializerFor(type.modelName);

    //     serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    //     var id = snapshot.id;
    //     var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    //     return this.ajax(url, 'POST', { data: data });
    // }
    //    pathForType: function (type) {
    //        var path = this._super(type);
    //        if (path == 'canvas') {
    //            path = 'canvases';
    //        }
    //        return Ember.String.underscore(path);
    //    }    
});
