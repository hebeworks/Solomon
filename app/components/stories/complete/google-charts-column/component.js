/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Google Charts - Column Chart', // (Provide a story title)
        subTitle: 'Story showing an example column chart', // (Provide a story subtitle)
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
            this.drawColumnChart()
        );
    }.observes('loaded'),
    
    drawColumnChart: function() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('string', 'Location');
        data.addColumn('number', 'Percentage Full');

              data.addRows([
                ['Leeds City', .78],
                ['Yeadon', .54],
                ['Pudsey', .67],
                ['Otley', .63]
              ]);

              var options = {
                title: 'Column Chart',
                vAxis: {
                    format: 'percent',
                    baseline: 0
                },
                chartArea: {
                    width: '85%',
                    height: '65%',
                    top: '20%',
                    left: '15%'
                },
                width: 290,
                height: 220,
                legend: {
                    position: 'top'
                }
              };

              var chart = new google.visualization.ColumnChart(
                document.getElementById('google-column-chart-single'));

              chart.draw(data, options);
    }
});
