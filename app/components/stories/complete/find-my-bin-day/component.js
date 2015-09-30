/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    addresses: [],
    selectedAddress: null,
    currentAddress: null,
    showCalendarButton: false,
    
    saveThisEvent: function() {
        var obj = this;
        
        $.getScript( "https://addthisevent.com/libs/1.5.8/ate.min.js", function() {
            // debugger;
            addthisevent.settings({
                mouse: false,
                css: false,
                outlook: { show: true, text: "Outlook Calendar" },
                google: { show: true, text: "Google Calendar" },
                yahoo: { show: true, text: "Yahoo Calendar" },
                ical: { show: true, text: "iCal Calendar" },
                hotmail: { show: true, text: "Hotmail Calendar" },
                facebook: { show: true, text: "Facebook Calendar" }
            });
            
            obj.set('showCalendarButton', true);
        });
    },
    
    onAddressChange: function () {
        var obj = this;
        var id = this.get('selectedAddress.id')
        if (!Ember.isEmpty(this.get('selectedAddress'))) {
            this.getData('http://hebenodeapi-preview.azurewebsites.net/bins/' + id)
                .then(function (address) {
                    var allDates = [];
                    
                    address.routes.forEach(function (route) {
                        route.dates.forEach(function(date) {
                            allDates.push({
                                date: date,
                                formattedDate: moment,
                                type: route.type,
                                description: getDescription(route.type),
                                code: route.code
                            });
                            
                            function getDescription(code) {
                                code = code.toLowerCase();
                                
                                switch(code) {
                                    default :
                                        return {short: 'General' , long: 'General rubbish', icon: 'bin-icon'};
                                    case 'green' :
                                        return  {short: 'Recycling', long: 'Paper, cardboard, cans, aluminium aerosols, foil, plastics', icon: 'recycle-icon'};
                                    case 'brown' :
                                        return {short: 'Garden', long: 'Grass cuttings, hedge clippings, leaves, plants, twigs, small tree branches', icon: 'brown-icon'};
                                }
                            };
                        });
                    });
                    
                    var orderedDates = _.sortBy(allDates,function(el){
                        return el.date;
                    });
                    
                    obj.set('orderedDates',orderedDates);
                    
                    obj.saveThisEvent();
                    
                    // address.routes.forEach(function (route) {
                    //     route.orderedDates = route.dates.sort().slice(0, 2);
                    // })

                    obj.set('currentAddress', address);
                });
        }
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
        },
        
        changeAddress: function() {
            this.set('currentAddress', null);
            this.set('selectedAddress', null);
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
