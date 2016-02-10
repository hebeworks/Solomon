import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    // isNewSerializerAPI: true,
    // primaryKey: '_id',

    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
        var data = [];

        if (!Ember.isArray(payload)) {
            payload = [payload];
        }

        payload.forEach(function (item) {
            var relationships = {};
            var arrayProps = [];
            for (var prop in item) {
                if (item.hasOwnProperty(prop) &&
                    Ember.isArray(item[prop]) &&
                    item[prop].length > 0) {
                    arrayProps.push(prop);
                    // console.log('Serializing an array: ' + prop);
                    var typeName = prop.singularize();
                    if (relationships[prop] == null) {
                        relationships[prop] = {
                            data: []
                        }
                    }
                    item[prop].forEach(function (subItemID) {
                        relationships[prop].data.push({
                            type: typeName,
                            id: subItemID
                        });
                    });
                }
            }

            arrayProps.forEach(function(prop){
                delete item[prop];
            })
            data.push({
                "type": primaryModelClass.modelName,
                "id": item._id,
                "attributes": item,
                relationships: relationships
            });
        });

        if (requestType.toLowerCase().indexOf('record') == -1) {
            // individual record query was run
            data = data;
        } else {
            // the request type is for multiple items
            // e.g. findAll, peekAll, query
            data = (data.length == 1 ? data[0] : data);
        }

        var response = {
            "data": data,
            // "included" : storiesIncluded
        };
        return response;
    },



	keyForAttribute: function(key) {
        //return Ember.String.dasherize(key);
        return Ember.String.camelize(key);
    },
    keyForRelationship: function(key) {
        //return Ember.String.dasherize(key);
        return Ember.String.camelize(key);
    },
    keyForSnapshot: function(snapshot) {
        //return Ember.String.dasherize(snapshot.typeKey);
        return Ember.String.camelize(snapshot.typeKey);
    },



    extractArray: function (store, type, payload) {
        var payloadTemp = {};
        payloadTemp[type.modelName] = payload;
        return this._super(store, type, payloadTemp);
    },

    extractSingle: function (store, type, payload, id) {
        var payloadTemp = {};
        payloadTemp[type.modelName] = [payload];
        return this._super(store, type, payloadTemp, id);
    }
});
