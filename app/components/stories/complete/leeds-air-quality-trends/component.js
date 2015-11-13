/* global _,moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    title: 'Leeds Air Quality Trends',
    subTitle: "See how Leeds' air quality has changed over time",
    storyModel: null,
    chartType: 'line',

    locations: [],

    loadLocations: function () {
        var _this = this;
        var hebeNodeAPI = this.get('hebeNodeAPI');
        this.getData(hebeNodeAPI + '/air-quality-nitrogen-dioxide?selectfields=location')
            .then(function (data) {
                var locations = _.map(data,function(item){ return { text: item.location, id: item.location }; });
                _this.setProperties({
                    locations: locations,
                    location: locations[0]
                });
            });
    }.on('didInsertElement'),
    
    location: null,
    onLocationChange: function() {
        var location = this.get('location');
        this.loadData(location.id);
    }.observes('location'),

    loadData: function (location) {
        var _this = this;
        var hebeNodeAPI = this.get('hebeNodeAPI');
        this.getData(hebeNodeAPI + '/air-quality-nitrogen-dioxide?location=' + encodeURIComponent(location) + '&limit=1')
            .then(function (data) {
                var dates = data[0].monthly_averages;
                var sortedDates = _.sortBy(dates, function (date) {
                    return new Date(date.date);
                });
                // sortedDates.reverse();
                var chartLabels = _.map(sortedDates, function (date) { return moment(new Date(date.date)).format('MMM YY'); });
                var chartSeries = _.map(sortedDates, function (date) { return date.average; });
                var chartData = {
                    labels: chartLabels,
                    series: [chartSeries]
                };
                console.log('loaded');
                console.log(chartData);
                _this.setProperties({
                    chartData: chartData
                })
            });
    },
    

    // chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // chartSeries: [
    //     [1, 5, 2, 5, 4, 3],
    //     [2, 3, 4, 8, 1, 2],
    //     [5, 4, 3, 2, 1, 0.5]
    // ],

    // chartData2: Ember.computed('chartSeries', 'chartLabels', {
    //     get() {

    //         var data = this.get('data');
    //         var labels = _.map(data, function (item) {
    //             return moment(new Date(item.date["$date"])).format("MMM YY");
    //         });
    //         var series = [];
    //         data.forEach(function (item) {
    //             var i = 0;
    //             for (var prop in item) {
    //                 if (series[i] == null) {
    //                     series[i] = [];
    //                 }
    //                 if (prop != "date") {
    //                     series[i].push(item[prop]);
    //                     i++;
    //                 }
    //             }
    //         });
    //         var chartData = {
    //             labels: labels,
    //             series: series
    //         };
    //         console.log('hardcoded');
    //         console.log(chartData);
    //         return chartData
    //     }
    // }),

    chartOptions: {
        low: 0,
        showArea: false,
        showPoint: true,
        fullWidth: false,
        lineSmooth: Chartist.Interpolation.simple({
            divisor: 20
        }),
        axisY: {
            labelInterpolationFnc: function (value) {
                return value + 'ppb'
            }
        }
    },
    
    // This is fake data, for now
    // data: [
    //     {
    //         // Sep 2014
    //         "Monthly Average": 32.3265,
    //         "date": {
    //             "$date": 1412031600000
    //         }
    //     },
    //     {
    //         // Oct 2014
    //         "Monthly Average": 25.108,
    //         "date": {
    //             "$date": 1414713600000
    //         }
    //     },
    //     {
    //         // Nov 2014
    //         "Monthly Average": 16.771,
    //         "date": {
    //             "$date": 1417305600000
    //         }
    //     },
    //     {
    //         // Dec 2014
    //         "Monthly Average": 23.9942,
    //         "date": {
    //             "$date": 1419984000000
    //         }
    //     }
    // ],
    
    // Add tooltips which appear above the data points and show the full data value
    addToolTips: function () {
        var $chart = this.$('.ct-chart');

        var $toolTip = $chart
            .append('<div class="ct-tooltip"></div>')
            .find('.ct-tooltip')
            .hide();

        $chart.on('mouseenter', '.ct-point', function () {
            var $point = $(this),
                value = $point.attr('ct:value'),
                index = $point.attr('spc-air-index'),
                band = $point.attr('spc-air-band');

            $toolTip
                .html(value + '<br />' + band)
                .attr('spc-tooltip-air-index', index)
                .show();
        });

        $chart.on('mouseleave', '.ct-point', function () {
            $toolTip.hide();
        });

        $chart.on('mousemove', function (event) {
            var tooltipWidth = $toolTip.width(),
                tooltipHeight = $toolTip.height();

            $toolTip.css({
                left: (event.originalEvent.layerX) - tooltipWidth / 2 - 10,
                top: (event.originalEvent.layerY) - tooltipHeight - 25
            });
        });
    }.observes('chart'),
    
    // Colour the data points (and tooltip) with the relevant colour based on where the reading falls in the air quality index. See https://en.wikipedia.org/wiki/Air_quality_index#United_Kingdom and http://uk-air.defra.gov.uk/air-pollution/daqi
    colourData: function () {
        var obj = this,
            chart = obj.get('chart');

        chart.on('draw', function (data) {
            if (data.type === 'point') {
                obj.$('.ct-point').each(function () {

                    var reading = $(this).attr('ct:value');

                    if (0 <= reading && reading <= 67) {
                        // Index: 1
                        $(this)
                            .attr('spc-air-index', '1')
                            .attr('spc-air-band', 'low');
                    } else if (68 <= reading && reading <= 134) {
                        // Index: 2
                        $(this)
                            .attr('spc-air-index', '2')
                            .attr('spc-air-band', 'low');
                    } else if (135 <= reading && reading <= 200) {
                        // Index: 3
                        $(this)
                            .attr('spc-air-index', '3')
                            .attr('spc-air-band', 'low');
                    } else if (201 <= reading && reading <= 267) {
                        // Index: 4
                        $(this)
                            .attr('spc-air-index', '4')
                            .attr('spc-air-band', 'moderate');
                    } else if (268 <= reading && reading <= 334) {
                        // Index: 5
                        $(this)
                            .attr('spc-air-index', '5')
                            .attr('spc-air-band', 'moderate');
                    } else if (335 <= reading && reading <= 400) {
                        // Index: 6
                        $(this)
                            .attr('spc-air-index', '6')
                            .attr('spc-air-band', 'moderate');
                    } else if (401 <= reading && reading <= 467) {
                        // Index: 7
                        $(this)
                            .attr('spc-air-index', '7')
                            .attr('spc-air-band', 'high');
                    } else if (468 <= reading && reading <= 534) {
                        // Index: 8
                        $(this)
                            .attr('spc-air-index', '8')
                            .attr('spc-air-band', 'high');
                    } else if (535 <= reading && reading <= 600) {
                        // Index: 9
                        $(this)
                            .attr('spc-air-index', '9')
                            .attr('spc-air-band', 'high');
                    } else if (601 <= reading) {
                        // Index: 10
                        $(this)
                            .attr('spc-air-index', '10')
                            .attr('spc-air-band', 'very high');
                    }
                });
            }
        });

    }.observes('chart')
});
