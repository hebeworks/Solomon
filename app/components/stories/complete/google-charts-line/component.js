/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Google Charts - Line Chart', // (Provide a story title)
        subTitle: 'Story showing an example line chart', // (Provide a story subtitle)
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
    },
    
    onInsertElement: function () {
        this.set('loaded', true);
    }.on('didInsertElement'),
    
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            this.drawLineChart()
        );
    }.observes('loaded'),

    drawLineChart: function() {
        var data = new google.visualization.DataTable();
        
        var data = google.visualization.arrayToDataTable([
            ['Week', 'Tuesday', 'Sunday'],
            ['1', .85, .78],
            ['2', .76, .80],
            ['3', .68, .89],
            ['4', .50, .94]
        ]);

        var options = {
            title: 'Line Chart',
            legend: { position: 'top' },
            width: 290,
            height: 220,
            pointSize: 5,
            chartArea: {
                width: '85%',
                height: '55%',
                top: '20%',
                left: '15%'
            },
            hAxis: {
                title: 'Week'
            },
            vAxis: {
                format: 'percent'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('google-line-chart-single'));

        chart.draw(data, options);
    }
});
