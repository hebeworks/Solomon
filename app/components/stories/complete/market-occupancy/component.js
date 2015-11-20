/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Leeds Markets Occupancy', // (Provide a story title)
        subTitle: 'Occupancy numbers for market stalls', // (Provide a story subtitle)
        author: 'Ste Allan',
        
        description: 'A chart showing how market stall occupancy has changed over a 13-month period.', // (Provide a longer description of the story)
        license: 'Open Government License', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com', // (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    // loaded: false, (Tell other elements that this story has loaded)
    
    onInsertElement: function () {
        this.drawChart();
    }.on('didInsertElement'),

    drawChart: function() {
        var trace1 = {
            x: ['Jan 15', 'Feb 15', 'Mar 15', 'Apr 15', 'May 15', 'Jun 15', 'Jul 15', 'Aug 15', 'Sep 15', 'Oct 15', 'Nov 15', 'Dec 15'],
            y: [95, 94, 90, 86, 80, 74, 78, 75, 70, 69, 67, 60],
            type: 'scatter'
        };
        
        var layout = {
            autosize: false,
            width: 290,
            height: 220,
            margin: {
                l: 30,
                r: 0,
                b: 30,
                t: 10,
                pad: 5
            },
            textposition: 'top left'
        };

        var data = [trace1];

        Plotly.newPlot('mo-chart', data, layout);
    }
});
