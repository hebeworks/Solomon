/* global Ember, hebeutils, _ */
// import DefaultStory from './../../story-types/default-story/component';
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'WQ Contacts by Need', // (Provide a story title)
        subTitle: 'What are people contacting us about?', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        slider: true, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },

    onInsertElement: function () {
        this.set('loaded', true);
    }.on('didInsertElement'),

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            // this.drawDonutChart(),
            this.drawChart()
        );
    }.observes('loaded'),

    onTopicAttrs: function(){
        this.get('ywData');
    }.on('didReceiveAttrs'),

    chartData: Ember.computed('ywData', {
        get() {
            var ywData = this.get('ywData');
            var chartData = [['Need', 'Count']];
            if (!Ember.isEmpty(ywData)) {
                var grouped = _.groupBy(ywData, function (obj) {
                    return obj.need; 
                    // Need
                    // Need Type
                    // Need Group
                });
                var sorted = _.sortBy(grouped, function (obj) {
                    return obj.length;
                });
                sorted.reverse();
                var itemsToShow = 5;
                var index = 0;
                sorted.forEach(function (obj) {
                    if(index < itemsToShow) {
                        chartData.push([obj[0].need, obj.length]);
                    }
                    index ++;
                });
            }
            return chartData;
        }
    }),

    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    
    drawChart: function() {
        var chartData = this.get('chartData');
        
        if(chartData.length > 1) {
            var data = google.visualization.arrayToDataTable(chartData);
            var maxValue = (chartData[1][1] * 1.1);
            var options = {
                // title: 'Column Chart',
                vAxis: {
                    baseline: 0
                },
                hAxis: {
                    viewWindow: {
                        max: maxValue
                    },
                },
                chartArea: {
                    width: '90%',
                    height: '80%',
                    top: '5%',
                    left: '100'
                },
                width: 290,
                height: 240,
                tooltip: {
                    isHtml: true
                },
                series: {
                    0: {
                        color: '#00b5ef'
                    }
                }
            };
    
            // var chart = new google.visualization.ColumnChart(document.getElementById('topic-time-chart'));
            var chart = new google.visualization.BarChart(document.getElementById('topic-time-chart'));
            // var chart = new google.charts.Bar(document.getElementById('google-column-chart-single'));
    
            chart.draw(data, options);
            // chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }.observes('chartData')
});
