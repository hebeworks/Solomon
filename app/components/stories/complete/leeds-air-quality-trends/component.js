

/* global ) */
import Ember from 'ember';

export default Ember.Component.extend({
    title: 'Leeds Air Quality Trends',
    subTitle: "See how Leeds' air quality has changed over time",
    storyModel: null,
    chartType: 'line',

    // chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // chartSeries: [
    //     [1, 5, 2, 5, 4, 3],
    //     [2, 3, 4, 8, 1, 2],
    //     [5, 4, 3, 2, 1, 0.5]
    // ],

    chartData: Ember.computed('chartSeries', 'chartLabels', {
        get() {

            var data = this.get('data');
            var labels = _.map(data,function (item) {
                return moment(new Date(item.date["$date"])).format("MMM YY");
            });
            var series = [];
            data.forEach(function (item) {
                var i = 0;
                for (var prop in item) {
                    if (series[i] == null) {
                        series[i] = [];
                    }
                    if(prop != "date") {
                        series[i].push(item[prop]);
                        i++;
                    }
                }
            });

            return {
                labels: labels,
                series: series
            }
        }
    }),

    chartOptions: {
        low: 0,
        showArea: false,
        showPoint: true,
        fullWidth: false,
        lineSmooth: Chartist.Interpolation.simple({
            divisor: 20
        }),
        axisY: {
            labelInterpolationFnc: function(value) {
                return value + 'ppb'
            }
        }
    },
    
    // This is fake data, for now
    data: [
        {
            // Sep 2014
            "Monthly Average": 32.3265,
            "date": {
                "$date": 1412031600000
            }
        },
        {
            // Oct 2014
            "Monthly Average": 25.108,
            "date": {
                "$date": 1414713600000
            }
        },
        {
            // Nov 2014
            "Monthly Average": 16.771,
            "date": {
                "$date": 1417305600000
            }
        },
        {
            // Dec 2014
            "Monthly Average": 23.9942,
            "date": {
                "$date": 1419984000000
            }
        }
    ],
    
    addToolTips: function() {
        var $chart = this.$('.ct-chart');

        var $toolTip = $chart
          .append('<div class="ct-tooltip"></div>')
          .find('.ct-tooltip')
          .hide();

        $chart.on('mouseenter', '.ct-point', function() {
          var $point = $(this),
            value = $point.attr('ct:value'),
            seriesName = $point.parent().attr('ct:series-name');
          $toolTip.html(value).show();
        });

        $chart.on('mouseleave', '.ct-point', function() {
          $toolTip.hide();
        });

        $chart.on('mousemove', function(event) {
          $toolTip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
            top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 20
          });
        });
    }.observes('chart')
});
