import DS from 'ember-data';
import config from 'hebe-dash/config/environment';

// export default DS.RESTAdapter.extend({
export default DS.JSONAPIAdapter.extend({
    needs: ['session'],
    host: config.APP.solomonAPIURL,
    namespace: 'api',
    ajax: function (url, type, hash) {
        if (Ember.isEmpty(hash)) hash = {};
        if (Ember.isEmpty(hash.data)) hash.data = {};
        var token = this.get('session.secure.token');
        hash.data.token = token;
        return this._super(url, type, hash);
    },
    // headers: Ember.computed('session.secure.token', function () {
    //     var token = this.get('session.secure.token');
    //     return { 'Authorization': 'Token: ' + token};
});


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