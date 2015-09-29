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
        this.getData('http://hebenodeapi-preview.azurewebsites.net/bins/' + id)
            .then(function (address) {
                var allDates = [];
                
                address.routes.forEach(function (route) {
                    route.dates.forEach(function(date) {
                        // debugger;
                        // var moment = moment.duration(moment(new Date()).diff(moment(new Date(date)))).humanize();
                        allDates.push({
                            date: date,
                            formattedDate: moment,
                            type: route.type
                        });
                    });
                });
                
                var orderedDates = _.sortBy(allDates,function(el){
                    return el.date;
                });
                
                obj.set('orderedDates',orderedDates);
                
                // address.routes.forEach(function (route) {
                //     route.orderedDates = route.dates.sort().slice(0, 2);
                // })

                obj.set('currentAddress', address);
            });
    }.observes('selectedAddress'),

    didReceiveAttrs: function () {
        this.set('title', 'find-my-bin-day TITLE');
        this.set('subTitle', 'find-my-bin-day SUB TITLE');
    },

    actions: {
        findPlaces: function (query, deferred) {
            this.setProperties({
                query: query,
                deferred: deferred
            });
            Ember.run.debounce(this, this.debouncedQuery, 600);
        }
    },
    
    debouncedQuery: function() {
        var obj = this;
        var query = obj.get('query');
        var deferred = obj.get('deferred');
        
        if(query != null && query.term != null && query.term.length > 3) {
            var url = 'http://hebenodeapi-preview.azurewebsites.net/bins/?q="' + query.term + '"&fields=address postcode';
            console.log(url);
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
    }
});
