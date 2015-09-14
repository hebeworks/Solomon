import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['story__chart-wrapper'],
    didInsertElement: function () {

        var customParams = this.get('graphParams');

        var defaultParams = {
            bindto: '#' + this.elementId + '>.story__chart',
            legend: {
                show: false
            },
            bar: {
                width: {
                    ratio: 0.7 // this makes bar width 50% of length between ticks
                }
                // or
                // width: 100 // this makes bar width 100px
            },
            grid: {
                x: {
                    show: false
                },
                y: {
                    show: true
                }
            }
        }

        var params = Ember.$.extend(defaultParams, customParams);

        var chart = c3.generate(params);

        if (this.get('showLegend') === true) {
            // Generate our custom legend
            d3.select('#' + this.elementId)
                .insert('div', '.story__chart')
                .attr('class', 'legend')
                .selectAll('span')
                .data(['data1', 'data2'])
                .enter().append('span')
                .attr('data-id', function (id) { return id; })
                .html(function (id) { return id; })
                .each(function (id) {
                d3.select(this).style('background-color', chart.color(id));
            })
            .on('mouseover', function (id) {
                chart.focus(id);
            })
            .on('mouseout', function (id) {
                chart.revert();
            })
            .on('click', function (id) {
                chart.toggle(id);
            });
        }
    }
});
