/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Google Charts - Stacked Column Chart', // (Provide a story title)
        subTitle: 'Story showing example stacked column chart', // (Provide a story subtitle)
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
            this.drawStackedColumnChart()
        );
    }.observes('loaded'),
    
    drawStackedColumnChart: function() {
        var data = google.visualization.arrayToDataTable([
            ['Location', 'Leeds City', 'Yeadon', 'Pudsey', 'Otley'],
            ['2012', 34, 5, 12, 7],
            ['2013', 41, 8, 13, 10],
            ['2014', 43, 13, 17, 15]
        ]);

        var options = {
          title: 'Stacked Column Chart',
          vAxis: {
              baseline: 0
          },
          chartArea: {
              width: '60%',
              height: '80%',
              top: '10%',
              left: '10%'
          },
          width: 290,
          height: 220,
          legend: {
              position: 'right'
          },
          isStacked: true
        };

        var chart = new google.visualization.ColumnChart(
          document.getElementById('google-stacked-column-chart-single'));

        chart.draw(data, options);
    }
});
