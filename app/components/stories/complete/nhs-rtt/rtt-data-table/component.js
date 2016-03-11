/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
        title: '',
        subTitle: '',
        height: '2',
        width: '3',
        viewOnly: true,
        showLoading: true
    },
    nhsFilter: Ember.computed.alias('appSettings.canvasSettings.nhsFilter'),
    headings: [
        { title: "Month", property: "_id" },
        { title: "Less than 18", property: "gt_00_to_18_weeks_sum" },
        { title: "18 - 26", property: "gt_18_to_26_weeks_sum" },
        { title: "26 - 40", property: "gt_26_to_40_weeks_sum" },
        { title: "40 - 52", property: "gt_40_to_52_weeks_sum" },
        { title: "Total", property: "total" }
    ],
    rows: [],
    title: 'Monthly Pathway Performance',

    onDidInsertElement: function () {
        var _this = this;
        var regionID = this.get('nhsFilter.selectedRegion.id');
        var ccgID = this.get('nhsFilter.selectedCCG.id');
        var providerID = this.get('nhsFilter.selectedProvider.id');
        var url = this.get('appSettings.hebeNodeAPI') + '/nhsrtt/monthly/';
        // regions/' + regionID + '';  // do get by parts (admitted etc) add ?parts=true
        if (providerID) {
            url += 'provider/' + providerID;
        } else if (ccgID) {
            url += 'ccgs/' + ccgID;
        } else {
            url += 'regions/' + regionID;
        }
        var headings = this.get('headings');
        this.getData(url)
            .then(function (data) {
                if(data.months && data.months.length > 0) {
                    data = data.months;   
                } else if (data.length > 0 && data[0].months) {
                    data = data[0].months;
                }
                if(data) {
                    data = _.sortBy(data, function (obj) {
                        return obj._id.date;
                    });
                    data.reverse();
                    var rows = _.map(data, function (obj) {
                        var row = [];
                        for (var i = 0; i < headings.length; i++) {
                            var prop = headings[i].property;
                            var val = obj[prop];
                            if (prop === "_id") {
                                val = moment(obj._id.date, "YYYYMMDD").format("MM YYYY");
                            }
                            row.push(val);
                        }
                        return row;
                    });
                    _this.set('rows', rows);
                    setTimeout(function () {
                        _this.set('loaded', true);
                    });
                }
            });
    }.on('didInsertElement').observes(
        'nhsFilter.selectedRegion',
        'nhsFilter.selectedProvider',
        'nhsFilter.selectedCCG'
        )


});
