/* global Ember, hebeutils, _, moment */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function () {
        this.set('title', 'LCC Contact Centre Enquiries');
        this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
        var obj = this;
        this.getData(this.get('datamillUrl') + '/api/3/action/package_show?id=customer-services-contact-enquiries')
            .then(function (data) {
            var resources = [];
            data.result.resources.forEach(function (item) {
                var resource = {};
                resource.text = item["name"];
                resource.id = item["id"];
                resource.date = item["temporal_coverage_to"];
                resources.push(resource);
            });

            _.sortBy(resources, function (month) {
                return month.date;
            });

            resources.reverse();

            obj.set('months', resources);
            obj.set('selectedMonth', obj.get('months')[0]);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },

    fetchMonth: function () {
        var obj = this;
        this.getData('http://hebenodeapi.azurewebsites.net/lccenquiries?id=' + this.get('selectedMonth.id'))
            .then(function (month) {
                
                obj.set('totalEnquiries', month.allItemTotals);
                obj.set('topPostcodes', month.topPostcodes);
                obj.set('topEnquiries', month.topEnquiries);
                obj.set('topServices', month.topServices);
    
                obj.set('face', month.face[0].total);
                obj.set('phone', month.phone[0].total);

                setTimeout(function () {
                    obj.set('loaded', true);
                });
            });
        }.observes('selectedMonth'),

    //    fetchMonth: function (resourceID) {
    //        var obj = this;
    //        this.getData(this.get('datamillUrl') + '/api/action/datastore_search_sql?sql=SELECT * from "' + this.get('selectedMonth.id') + '"')
    //            .then(function (data) {
    //                var items = [];
    //                data.result.records.forEach(function (item) {
    //                    // format API data here
    //                    var result = {};
    //                    result.location = item["Created at location"];
    //                    result.service = item["Service"];
    //                    result.postcode = item["Postcode trunc"];
    //                    result.enquiry = item["Enquiry Type"];
    //                    result.total = (item["Total"] != null ?
    //                        item["Total"] :
    //                        (item["Total contact"] != null ?
    //                            item["Total contact"] : 0));
    //                    items.push(result);
    //                });
    //    
    //                var allItemTotals = obj.getTotal(items, 'total');
    //                obj.set('totalEnquiries', allItemTotals);
    //                obj.set('topPostcodes', obj.getTopByProperty(items, 'postcode', 3));
    //                obj.set('topEnquiries', obj.getTopByProperty(items, 'enquiry', 3));
    //                obj.set('topServices', obj.getTopByProperty(items, 'service', 3));
    //    
    //                setTimeout(function () {
    //                    obj.set('loaded', true);
    //                });
    //            });
    //    }.observes('selectedMonth'),

    getTopByProperty: function (items, property, count) {
        var obj = this;
        var totalEnquiries = obj.get('totalEnquiries');
        var itemTotals = _.groupBy(items, property);
        itemTotals = _.map(itemTotals, function (element) {
            var sum = obj.getTotal(element, 'total');
            var percentage = ((sum / totalEnquiries) * 100).toPrecisionDigits(1);
            // console.log('totalEnquiries: ' + totalEnquiries + ',total: ' + sum + ', %: ' + percentage);
            var result = {
                total: sum,
                percentage: percentage
            };
            result[property] = _.first(element)[property];
            return result;
        });
        itemTotals = _.sortBy(itemTotals, 'total').reverse();

        return itemTotals.slice(0, count);
    },

    getTotal: function (items, prop) {
        var sum = _.reduce(items, function (memo, item) {
            if (item[prop] != null && parseFloat(item[prop])) {
                return memo + parseFloat(item[prop]);
            } else {
                return memo;
            }
        }, 0);
        return sum;
    }
});
