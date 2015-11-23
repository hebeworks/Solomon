/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Leeds Outside Markets', // (Provide a story title)
        subTitle: 'Statistics for Leeds city, Yeadon, Pudsey and Otley', // (Provide a story subtitle)
        author: 'Ste Allan',
        
        description: 'A chart showing how market stall occupancy has changed over a 13-month period.', // (Provide a longer description of the story)
        license: 'UK Open Government Licence (OGL v2)', // (Define which license applies to usage of the story)
        dataSourceUrl: 'http://leedsdatamill.org/dataset/leeds-markets', // (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com', // (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        slider: true, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    // loaded: false, (Tell other elements that this story has loaded)
    
    onInsertElement: function () {
        this.set('loaded', true);
    }.on('didInsertElement'),
    
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            this.drawTotalOccupiedStalls(),
            this.drawPCEmptyStalls(),
            this.drawAvgOccupiedStalls()
        );
    }.observes('loaded'),
    
    drawTotalOccupiedStalls: function() {
        var data = new google.visualization.DataTable();
        
        var data = google.visualization.arrayToDataTable([
            ['Day', 'Leeds City', 'Yeadon', 'Otley', 'Pudsey'],
            ['Mon', 154, null, null, null],
            ['Tue', 148, null, 24, 1],
            ['Wed', null, null, null, null],
            ['Thu', 195, null, null, null],
            ['Fri', 169, 12, 61, 10],
            ['Sat', 200, null, 51, 5],
            ['Sun', null, null, null, null],
            ['Mon', 154, null, null, null],
            ['Tue', 148, null, 24, 1],
            ['Wed', null, null, null, null],
            ['Thu', 195, null, null, null],
            ['Fri', 169, 12, 61, 10],
            ['Sat', 200, null, 51, 5],
            ['Sun', null, null, null, null],
            ['Mon', 154, null, null, null],
            ['Tue', 148, null, 24, 1],
            ['Wed', null, null, null, null],
            ['Thu', 195, null, null, null],
            ['Fri', 169, 12, 61, 10],
            ['Sat', 200, null, 51, 5],
            ['Sun', null, null, null, null],
            ['Mon', 154, null, null, null],
            ['Tue', 148, null, 24, 1],
            ['Wed', null, null, null, null],
            ['Thu', 195, null, null, null],
            ['Fri', 169, 12, 61, 10],
            ['Sat', 200, null, 51, 5],
            ['Sun', null, null, null, null]
        ]);

        var options = {
            title: 'Daily Number of Occupied Stalls',
            legend: {
                position: 'top',
                maxLines: '4'
            },
            width: 290,
            height: 390,
            pointSize: 3,
            lineWidth: 1,
            interpolateNulls: true,
            chartArea: {
                width: '90%',
                height: '60%',
                top: '20%',
                left: '10%'
            },
            hAxis: {
                title: 'Day'
            },
            vAxis: {
                minorGridlines: {
                    count: 4
                }
            },
            series: {
                0: { pointShape: 'circle' },
                1: { pointShape: 'triangle' },
                2: { pointShape: 'square' },
                3: { pointShape: 'diamond' }
            },
            crosshair: {
                trigger: 'both'
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart-no-occupied-stalls'));

        chart.draw(data, options);
    },
    
    drawPCEmptyStalls: function() {
        var data = new google.visualization.DataTable();
        
        var data = google.visualization.arrayToDataTable([
            ['Day', 'Leeds City', 'Yeadon', 'Otley', 'Pudsey'],
            ['Mon', .24, null, null, null],
            ['Tue', .27, null, .05, .97],
            ['Wed', null, null, null, null],
            ['Thu', .2, null, null, null],
            ['Fri', .20, .50, .04, .40],
            ['Sat', .01, null, .11, .95],
            ['Sun', null, null, null, null],
            ['Mon', .24, null, null, null],
            ['Tue', .27, null, .05, .97],
            ['Wed', null, null, null, null],
            ['Thu', .2, null, null, null],
            ['Fri', .20, .50, .04, .40],
            ['Sat', .01, null, .11, .95],
            ['Sun', null, null, null, null],
            ['Mon', .24, null, null, null],
            ['Tue', .27, null, .05, .97],
            ['Wed', null, null, null, null],
            ['Thu', .2, null, null, null],
            ['Fri', .20, .50, .04, .40],
            ['Sat', .01, null, .11, .95],
            ['Sun', null, null, null, null],
            ['Mon', .24, null, null, null],
            ['Tue', .27, null, .05, .97],
            ['Wed', null, null, null, null],
            ['Thu', .2, null, null, null],
            ['Fri', .20, .50, .04, .40],
            ['Sat', .01, null, .11, .95],
            ['Sun', null, null, null, null]
        ]);

        var options = {
            title: 'Percentage of Stalls Empty',
            legend: {
                position: 'top',
                maxLines: '4'
            },
            width: 290,
            height: 390,
            pointSize: 3,
            lineWidth: 1,
            interpolateNulls: true,
            chartArea: {
                width: '85%',
                height: '60%',
                top: '20%',
                left: '15%'
            },
            hAxis: {
                title: 'Day'
            },
            vAxis: {
                format: 'percent',
                minorGridlines: {
                    count: 4
                }
            },
            series: {
                0: { pointShape: 'circle' },
                1: { pointShape: 'triangle' },
                2: { pointShape: 'square' },
                3: { pointShape: 'diamond' }
            },
            crosshair: {
                trigger: 'both'
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart-pc-empty-stalls'));

        chart.draw(data, options);
    },
    
    drawAvgOccupiedStalls: function() {
        var data = google.visualization.arrayToDataTable([
            ['Location', 'Leeds City', 'Yeadon', 'Pudsey', 'Otley'],
            ['Mon', 153, null, 12, 7],
            ['Tue', 144, 8, 13, 10],
            ['Wed', 43, 13, 17, null],
            ['Thu', 43, 13, 17, 35],
            ['Fri', 43, 13, 17, 22],
            ['Sat', 43, 13, 17, null],
            ['Sun', 43, 13, 17, 12],
            ['Mon', 153, null, 12, 7],
            ['Tue', 144, 8, 13, 10],
            ['Wed', 43, 13, 17, null],
            ['Thu', 43, 13, 17, 35],
            ['Fri', 43, 13, 17, 22],
            ['Sat', 43, 13, 17, null],
            ['Sun', 43, 13, 17, 12],
            ['Mon', 153, null, 12, 7],
            ['Tue', 144, 8, 13, 10],
            ['Wed', 43, 13, 17, null],
            ['Thu', 43, 13, 17, 35],
            ['Fri', 43, 13, 17, 22],
            ['Sat', 43, 13, 17, null],
            ['Sun', 43, 13, 17, 12],
            ['Mon', 153, null, 12, 7],
            ['Tue', 144, 8, 13, 10],
            ['Wed', 43, 13, 17, null],
            ['Thu', 43, 13, 17, 35],
            ['Fri', 43, 13, 17, 22],
            ['Sat', 43, 13, 17, null],
            ['Sun', 43, 13, 17, 12]
        ]);

        var options = {
          title: 'Daily Avg. Number of Occupied Stalls',
          vAxis: {
              baseline: 0
          },
          chartArea: {
              width: '90%',
              height: '60%',
              top: '20%',
              left: '10%'
          },
          width: 290,
          height: 390,
          legend: {
              position: 'top',
              maxLines: '4'
          },
          isStacked: true
        };

        var chart = new google.visualization.ColumnChart(
          document.getElementById('chart-avg-occupied-stalls'));

        chart.draw(data, options);
    }
});
