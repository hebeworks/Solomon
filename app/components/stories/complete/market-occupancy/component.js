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

        var chart = new google.visualization.LineChart(document.getElementById('chart-pc-empty-stalls'));

        chart.draw(data, options);
    },
    
    drawAvgOccupiedStalls: function() {
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
          document.getElementById('chart-avg-occupied-stalls'));

        chart.draw(data, options);
    }
});
