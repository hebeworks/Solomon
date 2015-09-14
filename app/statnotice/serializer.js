import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    extractArray: function (store, type, payload) {
        var payloadTemp = {};
		payload.forEach(function (item) {
			// mongodb coordinates order is [longitude,latitude]
			item.lng = item.location.coordinates[0];
			item.lat = item.location.coordinates[1];
			// console.log('lat:' + item.lat + ', lng:' + item.lng);
		})
        payloadTemp[type.typeKey] = payload;
        return this._super(store, type, payloadTemp);
    },
    extractSingle: function (store, type, payload, id) {
        var payloadTemp = {};
        payloadTemp[type.typeKey] = [payload];
        return this._super(store, type, payloadTemp, id);
    }
});


// export default DS.RESTSerializer.extend({
// 	isNewSerializerAPI: false,
//     primaryKey: '_id',
// 	extractArray: function (store, type, payload) {
// 		payload.forEach(function (item) {
// 			// mongodb coordinates order is [longitude,latitude]
// 			item.lng = item.location.coordinates[0];
// 			item.lat = item.location.coordinates[1];
// 			console.log('lat:' + item.lat + ', lng:' + item.lng);
// 		})
//         return this._super(store, type, payload);
//     },
// });
