/* global Ember, hebeutils, _, moment */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function () {
        this.set('title', 'LCC Contact Centre Enquiries');
        this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
        var _this = this;
        var hebeNodeAPI = this.get('hebeNodeAPI');
        this.getData(hebeNodeAPI + '/customer-services-contact-enquiries?sort=month&sortdirection=DESC')
            .then(function (data) {

            var months = [];
            data.forEach(function (item) {
                var month = {
                    text: moment(new Date(item["month"])).format('MMM YYYY'),
                    id: item["month"],
                    face: item.f2f.F2F,
                    phone: item.f2f.CC,
                    topPostcodes: _.sortBy(item.postcode,function(obj){return obj[0];}).reverse().map(function(obj){ return {
                        postcode: obj[0],
                        total: obj[1],
                        percentage: _this.getPercentage(item.total,obj[1])
                    }}),
                    topEnquiries: _this.getTopEnquiries(item)
                }
                months.push(month);
           
            });

            _this.set('months',months)
            _this.set('selectedMonth', _this.get('months')[0]);

            setTimeout(function () {
                _this.set('loaded', true);
            });
        });
    },
    
    getTopEnquiries: function(item) {
        // get the titles & values then sort and take the top 3
        var data = item.enquries;
        var _this = this;
        var enquiries = [];
        for(var prop in data) {
            enquiries.push({ key: prop, val: data[prop]});    
        }
        
        return _.sortBy(enquiries,function(obj){ return obj.val; })
            .reverse()
            .map(function(obj){ return {
                enquiry: obj.key,
                total: obj.val,
                percentage: _this.getPercentage(item.total,obj.val)
            }})
            .slice(0,3);
    },
    
    getPercentage: function(totalVal,val) {
        return ((val/totalVal) * 100).toPrecisionDigits(1)
    },
    
});
