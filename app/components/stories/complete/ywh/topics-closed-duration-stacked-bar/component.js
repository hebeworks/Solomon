/* global Ember, hebeutils, _, google, moment */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'WQ Contacts Closed on Contact',
        subTitle: 'The needs with most calls closed on contact',
        scroll: false,
        viewOnly: true,
        width:3
    },

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            // this.drawStackedColumnChart()
            this.drawStackedColumnChartMax()
            );
    }.on('didInsertElement'),

    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onReceivedAttrs: function () {
        this.get('appSettings.canvasSettings.ywData');
    }.on('didReceiveAttrs'),


    // drawStackedColumnChart: function () {
    //     var data = this.get('ywData');

    //     var chartData = [
    //         ['Topic', '30m', '1hr', '+1hr']
    //     ];

    //     if (!Ember.isEmpty(data)) {
    //         data.forEach(function (item) {
    //             item.duration.minutes = moment.duration(item.duration).minutes();
    //         });

    //         var grouped = this.get('appSettings').groupSortCount(data,'need',5, false);
    //         grouped.reverse();
    //         var count = 0;
            
    //         for (var i = 0; i < grouped.length; i++) {
    //             var prop = grouped[i].groupKey;
                
    //             if (count < 5) {
    //                 var length = grouped[i].items.length;
    //                 var items = grouped[i].items;
                    
    //                 var under30 = _.countBy(items, function (item) {
    //                     return item.duration.minutes < 30;
    //                 });
    //                 under30 = under30.true;
    //                 var under30P = parseInt((under30/length * 100).toString());
                    
    //                 var under60 = _.countBy(items, function (item) {
    //                     return (item.duration.minutes >= 30 && item.duration.minutes < 60);
    //                 });
    //                 under60 = under60.true;
    //                 var under60P = parseInt((under60P/length * 100).toString());
                    
    //                 var over60 = _.countBy(items, function (item) {
    //                     return (item.duration.minutes >= 60);
    //                 });
    //                 over60 = over60.true;
    //                 var over60P = parseInt((over60/length * 100).toString());
                    
    //                 chartData.push([prop, under30 || 0, under60 || 0, over60 || 0]);
    //                 // chartData.push([prop, under30P || 0, under60P || 0, over60P || 0]);
    //             }
    //             count++;
    //         }
    //         var data = google.visualization.arrayToDataTable(chartData);
    
    //         var options = {
    //             hAxis: {
    //                 textPosition: 'none',
    //                 direction: -1
    //             },
    //             vAxis: {
    //                 baseline: 0
    //             },
    //             chartArea: {
    //                 width: '80%',
    //                 height: '85%',
    //                 top: '10%',
    //                 left: '10%'
    //             },
    //             width: 290,
    //             height: 240,
    //             legend: {
    //                 position: 'top',
    //                 maxLines: 4
    //             },
    //             isStacked: true,
    //             tooltip: {
    //                 isHtml: true
    //             },
    //             series: {
    //                 0: {
    //                     color: 'rgb(70,142,229)'
    //                 },
    //                 1: {
    //                     color: 'rgb(89,172,0)'
    //                 }
    //             }
    //         };

    //         var chart = new google.visualization.ColumnChart(document.getElementById('google-stacked-column-chart-single1'));
    //         // var chart = new google.charts.Bar(document.getElementById('google-stacked-column-chart-single'));

    //         chart.draw(data, options);
    //         // chart.draw(data, google.charts.Column.convertOptions(options));

    //         this.set('loaded', true);
    //     }
    // }.observes('ywData'),
    
    
    
    
    drawStackedColumnChartMax: function () {
        var data = this.get('ywData');

        var chartData = [
            ['Topic', '30m', '1hr', '+1hr']
        ];

        if (!Ember.isEmpty(data)) {
            // data.forEach(function (item) {
            //     item.duration.minutes = moment.duration(item.duration).minutes();
            // });

            var grouped = this.get('appSettings').groupSortCount(data,'need');

            
            for (var i = 0; i < grouped.length; i++) {
                var prop = grouped[i].groupKey;
                
                    var length = grouped[i].items.length;
                    var items = grouped[i].items;
                    
                    var under30 = _.countBy(items, function (item) { return item.duration.minutes < 30; });
                    under30 = under30.true || 0;
                    // var under30P = parseInt((under30/length * 100).toString());
                    grouped[i].under30 = under30;
                    
                    var under60 = _.countBy(items, function (item) { return (item.duration.minutes >= 30 && item.duration.minutes < 60); });
                    under60 = under60.true || 0;
                    grouped[i].under60 = under60;
                    // var under60P = parseInt((under60P/length * 100).toString());
                    
                    var over60 = _.countBy(items, function (item) { return (item.duration.hours >= 1); });
                    over60 = over60.true || 0;
                    grouped[i].over60 = over60;
                    // var over60P = parseInt((over60/length * 100).toString());
                    
                    // chartData.push([prop, under30 || 0, under60 || 0, over60 || 0]);
                    // chartData.push([prop, under30P || 0, under60P || 0, over60P || 0]);

            }
            var sorted = _.sortBy(grouped,function(obj){
               return obj.under30; 
            });
            sorted.reverse();
            sorted.splice(5);
            // sorted.reverse();
            for (var i = 0; i < sorted.length; i++) {
                var item = sorted[i];                
                chartData.push([item.groupKey, item.under30 || 0, item.under60 || 0, item.over60 || 0]);
            }
            
            var data = google.visualization.arrayToDataTable(chartData);
    
            var options = {
                hAxis: {
                    textPosition: 'bottom left',
                    // direction: -1
                },
                vAxis: {
                    baseline: 0
                },
                chartArea: {
                    width: '90%',
                    height: '70%',
                    top: '10%',
                    left: '10%'
                },
                width: 435,
                height: 250,
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
                        color: 'rgb(255,255,0)'
                    },
                    2: {
                        color   : 'rgb(89,172,0)'
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