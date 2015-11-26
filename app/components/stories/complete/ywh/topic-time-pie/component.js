/* global Ember, hebeutils, _ */
// import DefaultStory from './../../story-types/default-story/component';
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Top 5 Topics by Volume', // (Provide a story title)
        subTitle: 'As a percentage of total contacts', // (Provide a story subtitle)
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
            this.drawDonutChart()
        );
    }.observes('loaded'),
    
    drawDonutChart: function() {
        var data = google.visualization.arrayToDataTable([
            ['Index', 'Rating'],
            ['Index 1', 10],
            ['Index 2', 18],
            ['Index 3', 15],
            ['Index 4', 5],
            ['Index 5', 9]
        ]);

        var options = {
            title: 'Donut Chart',
            pieHole: 0.3,
            chartArea: {
                width: '90%',
                height: '90%',
                top: '10%',
                left: '10%'
            },
            width: 290,
            height: 220,
            slices: {
                2: {
                    offset: 0.1
                }
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('google-donut-chart-single'));
        chart.draw(data, options);
    }
});
