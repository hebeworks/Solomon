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
        this.getData(hebeNodeAPI + '/customer-services-contact-enquiries?sort=date&sortdirection=DESC')
            .then(function (data) {

            var months = [];
            data.forEach(function (item) {
                var month = {
                    text: moment(new Date(item["month"])).format('MMM YYYY'),
                    id: item["month"],
                    face: (item["Face-To-Face"] ? item["Face-To-Face"] : item["F2F"]),
                    phone: (item["Phone"] ? item["Phone"] : item["CC"]),
                    topPostcodes: _.sortBy(item.top_postcodes,function(obj){return obj.enquiries;}).reverse().map(function(obj){ return {
                        postcode: obj.postcode,
                        total: obj.enquiries,
                        percentage: _this.getPercentage(item.total_enquiries,obj.enquiries)
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
    
    getPercentage: function(totalVal,val) {
        return ((val/totalVal) * 100).toPrecisionDigits(1)
    },
    
    getTopEnquiries: function(data) {
        var _this = this;
        var includedProps = ['Admin','Answerphone','Letter','Neighbourhood Warden','Social Media','Web Form','eMail'];
        debugger;
        var objs = [];
        for(var prop in data) {
            if(includedProps.indexOf(prop) > -1) {
                objs.push({
                    enquiry:prop,
                    total:data[prop],
                    percentage:_this.getPercentage(data.total_enquiries,data[prop])
                });
            }
        }
        var sorted = _.sortBy(objs,function(item){return item.total}).reverse();
        return sorted.slice(0,3);
    }
});
