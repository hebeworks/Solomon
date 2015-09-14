import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: 'story__chart-wrapper',
    renderChart: function() {

        var data = this.get('data');
        var $el = Ember.$(this.get('element'));

        var fullWidth = $el.innerWidth();
        var fullHeight = $el.innerHeight();

        var margin = {top: 10, right: 20, bottom: 30, left: 35},
            width = fullWidth - margin.left - margin.right,
            height = fullHeight - margin.top - margin.bottom;

        // Set our scales up for the axes - rangeRoundBands prevents pixellation difficulties http://bost.ocks.org/mike/bar/3/
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(1);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(1);

        // Create our chart element - it needs to be larger than the size of our data domain by the widths / heights of our margins, to allow for the axes.
        var chart = d3.select(this.get('element')).select(".js-line-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set our domains - this is the span of ys covered by each axis.
        y.domain([0, d3.max(data.map((d) => {return d.y;}))]);
        x.domain(data.map(function (d) {
            return d.x;
        }));

        chart.append("g")
            .attr("class", "x axis")
            .attr("height", 1)
            .attr("transform", "translate(0," + (height - 1) + ")")
            .call(xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .attr("width", 1)
            .call(yAxis);

        // Add axis labels
        chart.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 25)
            .text(this.get('xLabel'));

        chart.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -30)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(this.get('yLabel'));

        var lineFunc = d3.svg.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            })
            .interpolate('linear');

        chart.append('svg:path')
            .attr('d', lineFunc(data))
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    },
    didInsertElement: function() {
        this.renderChart();
    }
});


