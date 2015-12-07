/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

// hebe-dash/components/stories/complete/story-types/default-story/component

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },

    periodContacts: 0,
    period: '',

    currentYear: '2015',
    previousYear: '2014',
    currentYearContacts: 12000,
    previousYearContacts: 15000,
    threshold: 2000,
    ragRatingColour: 'lime', // lime (green) for below, amber for same or above
    ragRatingText: '',
    ragRatingPercentage: '',
    topContacts: [],
    years: [],
    onInsertElement: function () {
        // this.set('loaded', true);
        this.get('ywData');
        // this.queryData();
        // this.updateRagTile();
        this.get('years');
    }.on('didInsertElement'),

    queryData: function () {
        var _this = this;

        var appSettings = this.get('appSettings');
        var ywFilter = appSettings.canvasSettings.ywFilter;
        var ywData = ywFilter.data;


        if (!Ember.isEmpty(ywData)) {
            var primaryNeeds = appSettings.groupSortCount(ywData,'need',4);
            _this.set('primaryNeeds', primaryNeeds);

            var count = this.get('ywData.length');
            this.set('periodContacts', count);

            var dateString = 'from ' + moment(ywFilter.startDate).format('Do MMM YY') + ' to ' + moment(ywFilter.endDate).format('Do MMM YY')
            this.set('period', dateString);
            
            if (count < this.get('threshold')) {
                // alert('Lower contacts');
                this.set('ragRatingColour', 'lime');
            } else {
                // alert('Higher contacts');
                this.set('ragRatingColour', 'amber');
            }

            setTimeout(function () {
                _this.set('loaded', true);
            });
        }
    }.observes('appSettings.canvasSettings.ywFilter.data'),

    updateRagTile: function () {
        if (this.get('currentYearContacts') < this.get('previousYearContacts')) {
            var percentage = Math.round((100 - ((this.get('currentYearContacts') / this.get('previousYearContacts')) * 100)));

            this.set('ragRatingColour', 'lime');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'down on last year');

        } else {
            var percentage = Math.round((100 - ((this.get('previousYearContacts') / this.get('currentYearContacts')) * 100)));

            this.set('ragRatingColour', 'red');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'up on last year');
        }
    },

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(this.loadData());
    }.observes('loaded'),

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
            // .addRows([
            //     [new Date(2010, 11, 31), 13000],
            //     [new Date(2011, 11, 31), 13960],
            //     [new Date(2012, 11, 31), 14560],
            //     [new Date(2013, 11, 31), 14200],
            //     [new Date(2014, 11, 31), 15200],
            //     [new Date(2015, 11, 31), 16200]
            // ]);


            var options = {
                title: 'Annual Trend',
                titlePosition: 'out',
                titleTextStyle: {
                    bold: true,
                    fontSize: 14
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
                        color: '#1EA0C8'
                    }
                }
            };

            var chart = new google.visualization.LineChart(document.getElementById('yw-contacts-chart'));
            // var chart = new google.charts.Line(document.getElementById('yw-contacts-chart'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Line.convertOptions(options));
        }
    }.observes('years')
});
