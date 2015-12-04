/* global Ember, hebeutils, _, google, moment */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'WQ Contacts Closed on Contact',
        subTitle: 'Which needs are met in under an hour?',
        scroll: false,
        viewOnly: true
    },

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            this.drawStackedColumnChart()
            );
    }.on('didInsertElement'),

    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onReceivedAttrs: function () {
        this.get('appSettings.canvasSettings.ywData');
    }.on('didReceiveAttrs'),


    drawStackedColumnChart: function () {
        var data = this.get('ywData');

        var chartData = [
            ['Topic', '30m', '1hr', '+1hr'] //, 'open'],
            // ['Topic 1', 34, 5, 12, 7],
            // ['Topic 2', 34, 5, 12, 7],
        ];

        if (!Ember.isEmpty(data)) {
            data.forEach(function (item) {
                item.durationMins = moment.duration(item.duration).minutes();
            });
            
            // // group them by needs
            // var grouped = _.groupBy(data, function (obj) {
            //     return obj.need;
            // });

            // grouped = _.sortBy(grouped, function (obj) {
            //     return obj.length;
            // });


            var grouped = this.get('appSettings').groupSortCount(data,'need',5, false);
            grouped.reverse();
            var count = 0;
            
            for (var i = 0; i < grouped.length; i++) {
                var prop = grouped[i].groupKey;
                
                if (count < 5) {
                    var length = grouped[i].items.length;
                    
                    
                    var items = grouped[i].items;
                    
                    var under30 = _.countBy(items, function (item) {
                        return item.durationMins < 30;
                    });
                    under30 = under30.true;
                    var under30P = parseInt((under30/length * 100).toString());
                    
                    var under60 = _.countBy(items, function (item) {
                        return (item.durationMins >= 30 && item.durationMins < 60);
                    });
                    under60 = under60.true;
                    var under60P = parseInt((under60P/length * 100).toString());
                    
                    var over60 = _.countBy(items, function (item) {
                        return (item.durationMins >= 60);
                    });
                    over60 = over60.true;
                    var over60P = parseInt((over60/length * 100).toString());
                    
                    chartData.push([prop, under30 || 0, under60 || 0, over60 || 0]);
                    // chartData.push([prop, under30P || 0, under60P || 0, over60P || 0]);
                }
                count++;
            }



            var data = google.visualization.arrayToDataTable(chartData);
            
            // var data = google.visualization.arrayToDataTable([
            //     ['Location', 'Leeds City', 'Yeadon', 'Pudsey', 'Otley'],
            //     ['2012', 34, 5, 12, 7],
            //     ['2013', 41, 8, 13, 10],
            //     ['2014', 43, 13, 17, 15]
            // ]);
    
            var options = {
                hAxis: {
                    textPosition: 'none',
                    direction: -1
                },
                vAxis: {
                    baseline: 0
                },
                chartArea: {
                    width: '80%',
                    height: '85%',
                    top: '10%',
                    left: '10%'
                },
                width: 290,
                height: 240,
                legend: {
                    position: 'top',
                    maxLines: 4
                },
                isStacked: true,
                tooltip: {
                    isHtml: true
                },
                series: {
                    0: {
                        color: 'rgb(70,142,229)'
                    },
                    1: {
                        color: 'rgb(89,172,0)'
                    }
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('google-stacked-column-chart-single'));
            // var chart = new google.charts.Bar(document.getElementById('google-stacked-column-chart-single'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Column.convertOptions(options));

            this.set('loaded', true);
        }
    }.observes('ywData')
});