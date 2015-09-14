/* global hebeutils, _, moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    months: null,

    selectedMonthChanged: function () {
        var month = this.get('selectedMonth');
        if (month != null) {
            var total = ((month.foi_requests + month.eir_requests) - month.cancelled);
            var within_20_days = month.within_20_days;
            var over_20_days = month.over_20_days;

            var within_20_days_percent = ((within_20_days / total) * 100).toPrecisionDigits(1);
            var over_20_days_percent = ((over_20_days / total) * 100).toPrecisionDigits(1);

            var full_disclosure = month.full_disclosure;
            var partial_disclosure = month.partial_disclosure;
            var withheld = month.withheld;
            this.setProperties({
                within_20_days: total,
                over_20_days: withheld,
                within_20_days_percent: within_20_days_percent,
                over_20_days_percent: over_20_days_percent,
                full_disclosure: partial_disclosure,
                partial_disclosure: full_disclosure,
                withheld: over_20_days,
                total: within_20_days
            });


        }
    }.observes('selectedMonth'),

    didInsertElement: function () {
        this.set('title', 'FOI & EIR');
        this.set('subTitle', 'Number of FOI & EIR Requests');
        var obj = this;
        // var resourceID = '1ffffdba-ef32-40de-b73a-7026969d35b2';
        this.getData('http://hebenodeapi.azurewebsites.net/foi')
            .then(function (data) {
            var items = [];
            data.results.forEach((tmpItem) => {
                // ignore empty data 
                if (tmpItem.foi_requests.toString().notNullOrEmpty() && tmpItem.eir_requests.toString().notNullOrEmpty()) {
                    var id = hebeutils.guid();
                    var date = moment('01-' + tmpItem.month).format('YYYY-MM-DD');
                    var item = {
                        id: id,
                        extract_date: tmpItem.extract_date,
                        organiser: tmpItem.organiser,
                        month: tmpItem.month,
                        date: date,
                        foi_requests: parseInt(tmpItem.foi_requests),
                        eir_requests: parseInt(tmpItem.eir_requests),
                        within_20_days: parseInt(tmpItem.within_20_days),
                        over_20_days: parseInt(tmpItem.over_20_days),
                        cancelled: parseInt(tmpItem.cancelled),
                        full_disclosure: parseInt(tmpItem.full_disclosure),
                        partial_disclosure: parseInt(tmpItem.partial_disclosure),
                        withheld: parseInt(tmpItem.withheld)
                    };
                    items.push(item);
                }
            });

            _.sortBy(items, function (month) {
                return month.date;
            });

            items.reverse();

            obj.set('months', items);

            if (items.length > 0) {
                obj.set('selectedMonth', items[0]);
            }

            setTimeout(() => {
                obj.set('loaded', true);
            });
        });
    },

});
