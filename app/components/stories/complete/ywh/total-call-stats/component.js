/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

// hebe-dash/components/stories/complete/story-types/default-story/component

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    currentYear: '2015',
    previousYear: '2014',
    currentYearContacts: 12000,
    previousYearContacts: 15000,
    ragRatingColour: '', // lime (green) for below, red for same or above
    ragRatingText: '',
    ragRatingPercentage: '',
    
    onInsertElement: function () {
        this.set('loaded', true);
        this.updateRagTile();
    }.on('didInsertElement'),
    
    updateRagTile: function() {
        if (this.get('currentYearContacts') < this.get('previousYearContacts')) {
            var percentage = Math.round((100 - ((this.get('currentYearContacts') / this.get('previousYearContacts')) * 100)));
            
            this.set('ragRatingColour', 'lime');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'down on last year');
            
        } else {
            var percentage = Math.round((100 - ((this.get('previousYearContacts') / this.get('currentYearContacts')) * 100)));
            
            this.set('ragRatingColour', 'red');
            this.set('ragRatingPercentage', percentage);
            this.set('ragRatingText', 'up on last year');
        }
    },
    
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(this.drawChart());
    }.observes('loaded'),

    drawChart: function() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('date', 'Year');
        data.addColumn('number', 'Contacts');
        
        // data.addColumn({
        //     type: 'string', 
        //     role: 'tooltip'
        // });

        data.addRows([
            [new Date(2010, 11, 31), 13000],
            [new Date(2011, 11, 31), 13960],
            [new Date(2012, 11, 31), 14560],
            [new Date(2013, 11, 31), 14200],
            [new Date(2014, 11, 31), 15200],
            [new Date(2015, 11, 31), 16200]
        ]);

        var options = {
            titleTextStyle: {
                bold: true,
                fontSize: 14
            },
            width: 270,
            height: 93,
            chartArea: {
                width: 260,
                height: 83,
                top: 5,
                left: 5
            },
            legend: {
                position: 'none'
            },
            pointSize: 8,
            hAxis: {
                title: '',
                // format: 'yyyy',
                gridlines: {
                    count: -1,
                    color: 'transparent'
                },
                textPosition: 'none',
                textStyle: {
                    color: 'transparent'
                }
            },
            vAxis: {
                textPosition: 'none',
                gridlines: {
                    color: 'transparent'
                },
            },
            selectionMode: 'multiple',
            tooltip: {
                isHtml: true
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('yw-contacts-chart'));

        chart.draw(data, options);
    }
});