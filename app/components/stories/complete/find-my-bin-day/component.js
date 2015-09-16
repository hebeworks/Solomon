/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    addresses: [],
    selectedAddress: null,
    currentAddress: null,
    onAddressChange: function () {
        var obj = this;
        var id = this.get('selectedAddress.id')
        this.getData('http://localhost:3000/bins/' + id)
            .then(function (address) {
                alert(address.address);
                
                address.routes.forEach(function(route){
                    route.orderedDates = route.dates.sort().slice(0,2);
                })
                
                obj.set('currentAddress', address);
            });
    }.observes('selectedAddress'),

    didReceiveAttrs: function () {
        this.set('title', 'find-my-bin-day TITLE');
        this.set('subTitle', 'find-my-bin-day SUB TITLE');
    },

    actions: {
        findPlaces: function (query, deferred) {
            var obj = this;
            if (query != null && query.term != null && query.term.length > 3) {
                var url = 'http://localhost:3000/bins/?q="' + query.term + '"&fields=address postcode';
                // console.log(url);
                this.getData(url)
                    .then(
                        function (data) {
                            // var items = [];
                            data.forEach(function (item) {
                                item.id = item._id;
                                // 	var tmp = Ember.Object.create(item);
                                // 	items.push(tmp);
                            });

                            obj.set('addresses', data);
                            deferred.resolve(obj.get('addresses'));//{data: data, more: false});
                        }
                        , deferred.reject);
            }
        },
    }
});
