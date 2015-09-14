import Ember from 'ember';

export default Ember.Component.extend({
    svgClass: function () {
        return 'svg-house-price-icon-' + this.get('icon');
    }.property(),

    chartDataChanged: function () {
        var chartData = this.get('chartData');

        var xAxis = ['x'];
        var values = ['leeds'];

        for (var i = 0; i < chartData.length; i++) {
            var item = chartData[i];
            xAxis.push(item.date);
            values.push(item.value);
        }

        this.set('graphParams',
            {
                data: {
                    columns: [
                        xAxis,
                        values,
// ['national', 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000],
                        
                    ],
                    x: 'x',
                    type: 'line',
                    colors: {
                        leeds: '#7ED321',
                        national: '#2980B9'
                    }
                },
                axis: {
                    x: {
                        show: false,
                        type: 'timeseries',
                        tick: {
                            format: '%b-%y'
                        },
                        count: 4
                    },
                    y: {
                        tick: {
                            count: 5,
                            format: function (d) {
                                return '£' + Math.round(d / 1000) + 'k';
                            }
                        }
                    }
                }
            });

    }.observes('chartData'),

    graphParams: null,
});