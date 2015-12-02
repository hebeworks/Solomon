/* global Ember, hebeutils, _, google */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'Contact Days', // (Provide a story title)
        subTitle: 'Days of the week by contact volume', // (Provide a story subtitle)
        viewOnly: true,
        scroll: false
    },

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        var _this = this;
        google.setOnLoadCallback(function () { _this.drawColumnChart() });
    }.on('didInsertElement'),

    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onDayInit: function () {
        this.get('appSettings.canvasSettings.ywData');
        this.get('ywData');
    }.on('init'),

    drawColumnChart: function () {

        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {

            var rows = [];
            var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            var contactDays = _.countBy(ywData, function (obj) {
                return moment(new Date(obj["creationDate"])).format('ddd');
            });
            days.forEach(function(prop) {
                rows.push([prop, contactDays[prop]]);
            });


            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Number of contacts');
            data.addRows(rows);
            // data.addRows([
            //     ['Leeds City', .78],
            //     ['Yeadon', .54],
            //     ['Pudsey', .67],
            //     ['Otley', .63]
            // ]);

            var options = {
                // title: 'Column Chart',
                vAxis: {
                    // format: 'percent',
                    baseline: 0
                },
                chartArea: {
                    width: '95%',
                    height: '80%',
                    top: '5%',
                    left: '0%'
                },
                width: 290,
                height: 240,
                tooltip: {
                    isHtml: true
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('google-column-chart-single'));
            // var chart = new google.charts.Bar(document.getElementById('google-column-chart-single'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }.observes('ywData')
});
