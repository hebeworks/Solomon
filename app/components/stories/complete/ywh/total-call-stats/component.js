/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: '',
        subTitle: '',
        scroll: false,
        viewOnly: true
    },

    periodContacts: 0,
    period: '',
    periodFrom: '',
    periodTo: '',

    currentYear: '2015',
    previousYear: '2014',
    currentYearContacts: 12000,
    previousYearContacts: 15000,
    threshold: 2000,
    ragRatingColour: 'yw-green', // yw-green for below, yw-amber for same or above
    ragRatingText: '',
    ragRatingPercentage: '',
    topContacts: [],
    years: [],
    onInsertElement: function () {
        google.setOnLoadCallback();
        this.loadData();
        this.queryData();
    }.on('didInsertElement'),

    queryData: function () {
        var _this = this;

        var appSettings = this.get('appSettings');
        var ywFilter = appSettings.canvasSettings.ywFilter;
        var ywData = ywFilter.data;

        if (!Ember.isEmpty(ywData)) {
            var primaryNeeds = appSettings.groupSortCount(ywData,'need',4);
            _this.set('primaryNeeds', primaryNeeds);

            var count = ywData.length;
            this.set('periodContacts', count);

            // var dateString = 'from ' + moment(ywFilter.startDate).format('Do MMM YY') + ' to ' + moment(ywFilter.endDate).format('Do MMM YY');
            
            var dateStringFrom = 'from ' + moment(ywFilter.startDate).format('Do MMM YY');
            var dateStringTo = ' to ' + moment(ywFilter.endDate).format('Do MMM YY');
            
            this.set('periodFrom', dateStringFrom);
            this.set('periodTo', dateStringTo);
            
            if (count < this.get('threshold')) {
                // alert('Lower contacts');
                this.set('ragRatingColour', 'yw-green');
            } else {
                // alert('Higher contacts');
                this.set('ragRatingColour', 'yw-amber');
            }

            setTimeout(function () {
                _this.set('loaded', true);
            });
        }
    }.observes('appSettings.canvasSettings.ywFilter.data'),

    updateRagTile: function () {
        if (this.get('currentYearContacts') < this.get('previousYearContacts')) {
            var percentage = Math.round((100 - ((this.get('currentYearContacts') / this.get('previousYearContacts')) * 100)));

            this.set('ragRatingColour', 'yw-green');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'down on last year');

        } else {
            var percentage = Math.round((100 - ((this.get('previousYearContacts') / this.get('currentYearContacts')) * 100)));

            this.set('ragRatingColour', 'yw-red');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'up on last year');
        }
    },

    // loadGoogleAPIs: function () {
    //     // Draw the chart when the APIs have loaded
    //     google.setOnLoadCallback(this.loadData());
    // }.observes('loaded'),

    loadData: function () {
        var _this = this;
        this.getData(this.get('appSettings.hebeNodeAPI') + '/yw-contact-data?aggregatefield=calendarYear')
            .then(function (years) {
                years = _.sortBy(years, function (year) {
                    return year._id;
                });
                years.reverse();
                _this.set('years', years);
            });
    },

    drawChart: function () {
        var years = this.get('years');
        if (!Ember.isEmpty(years)) {
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Year');
            data.addColumn('number', 'Contacts');

            var yearArr = _.map(years, function (year) {
                return [new Date(year._id), year.count];
            });

            data.addRows(yearArr);

            var options = {
                title: 'Annual Trend',
                titlePosition: 'out',
                titleTextStyle: {
                    bold: false,
                    fontSize: 14,
                    color: '#004c6c',
                    fontName: 'Swiss Bold Rounded'
                },
                width: 270,
                height: 93,
                chartArea: {
                    width: 250,
                    height: 53,
                    top: 25,
                    left: 10
                },
                legend: {
                    position: 'none'
                },
                lineWidth: 3,
                pointSize: 0,
                hAxis: {
                    title: '',
                    format: 'yyyy',
                    gridlines: {
                        count: 6,
                        color: 'transparent'
                    }
                },
                vAxis: {
                    textPosition: 'none',
                    gridlines: {
                        color: 'transparent'
                    },
                },
                selectionMode: 'multiple',
                tooltip: {
                    trigger: 'both',
                },
                series: {
                    0: {
                        color: '#00b5ef'
                    }
                },
                curveType: 'function'
            };

            var chart = new google.visualization.LineChart(document.getElementById('yw-contacts-chart'));
            // var chart = new google.charts.Line(document.getElementById('yw-contacts-chart'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Line.convertOptions(options));
        }
    }.observes('years')
});
