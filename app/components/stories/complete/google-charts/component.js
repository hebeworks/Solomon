/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Google Charts - Multiple', // (Provide a story title)
        subTitle: 'Story with different types of Google Charts', // (Provide a story subtitle)
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
            this.drawLineChart(),
            this.drawColumnChart(),
            this.drawDonutChart(),
            this.drawStackedColumnChart()
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

        var chart = new google.visualization.LineChart(document.getElementById('google-line-chart'));

        chart.draw(data, options);
    },
    
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
                document.getElementById('google-column-chart'));

              chart.draw(data, options);
    },
    
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

        var chart = new google.visualization.PieChart(document.getElementById('google-donut-chart'));
        chart.draw(data, options);
    },
    
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
          document.getElementById('google-stacked-column-chart'));

        chart.draw(data, options);
    }
});
