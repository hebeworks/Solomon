/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        // color: 'lime', // (Set the story colour)
        width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '2', // (Set the height of the story)
        // slider: false, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    numberProperties: 0,
    numberPeople: 0,
    
    onInsertElement: function () {
        var _this = this;
        
        this.set('loaded', true);
        
        this.detectScreenSize();
        this.$(window).on('resize', function () {
            _this.detectScreenSize();
        });
    }.on('didInsertElement'),

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            this.drawChart1(),
            this.drawChart2()
        );
    }.observes('loaded'),
    
    drawChart1: function() {
        var data = google.visualization.arrayToDataTable([
            ['Account Type', 'Number of Properties'],
            ['Metered', 12000],
            ['Unmetered', 21500]
        ]);

        var options = {
            chartArea: {
                width: '86%',
                height: '80%',
                top: '13%',
                left: '7%'
            },
            width: 120,
            height: 120,
            // title: 'Metered/Unmetered',
            titleTextStyle: {
                fontSize: 9
            },
            legend: {
                position: 'top'
            },
            slices: {
                0: {
                    color: 'rgb(89,172,0)'
                },
                1: {
                    color: 'rgb(70,142,229)'
                }
            },
            pieHole: 0.8
        };

        var chart = new google.visualization.PieChart(document.getElementById('multi-pie-1'));
        chart.draw(data, options);
    },
    
    drawChart2: function() {
        var data = google.visualization.arrayToDataTable([
            ['Property Type', 'Number of Properties'],
            ['Commercial', 7000],
            ['Domestic', 53290]
        ]);

        var options = {
            chartArea: {
                width: '86%',
                height: '80%',
                top: '13%',
                left: '7%'
            },
            width: 120,
            height: 120,
            // title: 'Commercial/Domestic',
            titleTextStyle: {
                fontSize: 9
            },
            legend: {
                position: 'top'
            },
            slices: {
                0: {
                    color: 'rgb(89,172,0)'
                },
                1: {
                    color: 'rgb(70,142,229)'
                }
            },
            pieHole: 0.8
        };

        var chart = new google.visualization.PieChart(document.getElementById('multi-pie-2'));
        chart.draw(data, options);
    },
    
    detectScreenSize: function() {
        if (Modernizr.mq('only screen and (min-width: 680px')) {            
            this.set('storyConfig.width', 4);
            this.set('storyConfig.height', 1);
        } else {
            this.set('storyConfig.width', 2);
            this.set('storyConfig.height', 2);
        }
    }
});
