/* global address */
/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    storyConfig: {
        title: 'Find My Bin Day',
        subTitle: 'Find your next Leeds bin day'
    },
    
    addresses: [],
    selectedAddress: null,
    currentAddress: null,
    showCalendarButton: false,
    storyModel: null,
    minCheckTimer: null, 
    
    didReceiveAttrs: function () {
        this.set('title', 'find-my-bin-day TITLE');
        this.set('subTitle', 'find-my-bin-day SUB TITLE');
        var obj = this;
        obj.minCheckTimer = setInterval(obj.minimumLengthCheck, 200);
    },

    saveThisEvent: function () {
        var obj = this;

        $.getScript("https://addthisevent.com/libs/1.6.0/ate.min.js", function () {
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

    minimumLengthCheck: function () {
        var noResults = this.$('.select2-no-results');
        if (noResults.length > 0) {
            if (noResults.text().startsWith('Please enter')) {
                //   var minNumber = noResults.text().search(new RegExp("^\D*(\d+(?:\.\d+)?)"));
                noResults.text('Please enter the first part of your address');
            }
        }
    },

    onAddressChange: function () {
        var obj = this;
        var id = this.get('selectedAddress.id')
        if (!Ember.isEmpty(this.get('selectedAddress'))) {
            var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
            this.getData(hebeNodeAPI + '/bins/' + id)
                .then(function (address) {
                    var allDates = [];

                    address.streetAddress = (address.address.indexOf(',') > -1 ?
                        address.address.toString().substr(0, address.address.toString().indexOf(','))
                        : address.address);

                    address.shortAddress = address.streetAddress + (!Ember.isEmpty(address.postcode) ? ', ' + address.postcode : '');

                    address.routes.forEach(function (route) {
                        route.dates.forEach(function (date) {
                            var formattedDate = moment.duration(moment(new Date()).diff(moment(new Date(date)))).humanize();
                            allDates.push({
                                date: date,
                                formattedDate: formattedDate,
                                type: route.type,
                                description: getDescription(route.type),
                                code: route.code,
                            });

                            function getDescription(code) {
                                code = code.toLowerCase();

                                switch (code) {
                                    default:
                                        return { short: 'General', long: 'General rubbish', icon: 'bin-icon' };
                                    case 'green':
                                        return { short: 'Recycling', long: 'Paper, cardboard, cans, aluminium aerosols, foil, plastics', icon: 'recycle-icon' };
                                    case 'brown':
                                        return { short: 'Garden', long: 'Grass cuttings, hedge clippings, leaves, plants, twigs, small tree branches', icon: 'brown-icon' };
                                }
                            };
                        });
                    });

                    var futureDates = _.filter(allDates, function (date) {
                        return (new Date(date.date) >= new Date());
                    });

                    var orderedDates = _.sortBy(futureDates, function (el) {
                        return el.date;
                    });

                    orderedDates = orderedDates.slice(0, 8);

                    obj.set('orderedDates', orderedDates);

                    obj.saveThisEvent();
                    
                    // address.routes.forEach(function (route) {
                    //     route.orderedDates = route.dates.sort().slice(0, 2);
                    // })

                    obj.set('currentAddress', address);
                });
        }
    }.observes('selectedAddress'),


    actions: {
        findPlaces: function (query, deferred) {
            this.setProperties({
                query: query,
                deferred: deferred
            });
            Ember.run.debounce(this, this.debouncedQuery, 600);
        },

        changeAddress: function () {
            this.set('currentAddress', null);
            this.set('selectedAddress', null);
        }
    },

    debouncedQuery: function () {
        var obj = this;
        var query = obj.get('query');
        var deferred = obj.get('deferred');

        if (query != null && query.term != null && query.term.length >= 3) {
            var hebeNodeAPI = obj.get('appSettings.hebeNodeAPI');
            var url = hebeNodeAPI + '/bins/?q="' + query.term + '"&fields=address postcode';
            console.log(url);
            this.getData(url)
                .then(
                    function (data) {
                        // var items = [];
                        data.forEach(function (item) {
                            item.id = item._id;
                            item.streetAddress = (item.address.indexOf(',') > -1 ?
                                item.address.toString().substr(0, item.address.toString().indexOf(','))
                                : item.address);
                            item.shortAddress = item.streetAddress + (!Ember.isEmpty(item.postcode) ? ', ' + item.postcode : '');
                            
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
