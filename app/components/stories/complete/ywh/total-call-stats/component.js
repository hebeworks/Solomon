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
    
    periodContacts: 0,
    period: '',
    
    currentYear: '2015',
    previousYear: '2014',
    currentYearContacts: 12000,
    previousYearContacts: 15000,
    ragRatingColour: 'red', // lime (green) for below, red for same or above
    ragRatingText: '',
    ragRatingPercentage: '',
    topContacts: [],
    
    onInsertElement: function () {
        // this.set('loaded', true);
        this.get('appSettings.canvasSettings.ywData');
        // this.queryData();
        // this.updateRagTile();
    }.on('didInsertElement'),
    
    queryData: function () {
        var _this = this;
        
        var ywData = this.get('appSettings.canvasSettings.ywData'),
            appSettings = this.get('appSettings.canvasSettings');
            
        if (!Ember.isEmpty(ywData)) {
            var reasons = [];
            
            ywData.forEach(function (item) {
                reasons.push(
                    item['need']
                );
            });
            
            // Group repeated contacts together into same postcode
            function compressArray(original) {
             
                var compressed = [];
                // make a copy of the input array
                var copy = original.slice(0);
             
                // first loop goes over every element
                for (var i = 0; i < original.length; i++) {
             
                    var myCount = 0;    
                    // loop over every element in the copy and see if it's the same
                    for (var w = 0; w < copy.length; w++) {
                        if (original[i] == copy[w]) {
                            // increase amount of times duplicate is found
                            myCount++;
                            // sets item to undefined
                            delete copy[w];
                        }
                    }
             
                    if (myCount > 0) {
                        var a = new Object();
                        a.value = original[i];
                        a.count = myCount;
                        compressed.push(a);
                    }
                }
             
                return compressed;
            };

            var countedReasons = compressArray(reasons);
            
            // Put the postcodes in descending numeric order
            countedReasons.sort(function(a, b) {
                return parseFloat(a.count) - parseFloat(b.count);
            }).reverse();
            
            // Show only the top 3 reasons
            var topReasons = countedReasons.slice(0,3);
            
            _this.set('topContacts', topReasons);
            
            var count = this.get('appSettings.canvasSettings.ywData.length');
            this.set('periodContacts', count);
            
            var dateString = 'from ' + moment(appSettings.startDate).format('Do MMM YY') + ' to ' + moment(appSettings.endDate).format('Do MMM YY')
            this.set('period', dateString);
            
            setTimeout(function () {
                _this.set('loaded', true);
            });
        }
    }.observes('appSettings.canvasSettings.ywData'),
    
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
            title: 'Annual Trend',
            titlePosition: 'out',
            titleTextStyle: {
                bold: true,
                fontSize: 14
            },
            width: 270,
            height: 93,
            chartArea: {
                width: 260,
                height: 53,
                top: 25,
                left: 5
            },
            legend: {
                position: 'none'
            },
            pointSize: 0,
            hAxis: {
                title: '',
                format: 'yyyy',
                gridlines: {
                    count: -1,
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
                trigger: 'none'
            },
            series: {
                0: {
                    color: 'rgb(70,142,229)'
                }
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('yw-contacts-chart'));
        // var chart = new google.charts.Line(document.getElementById('yw-contacts-chart'));

        chart.draw(data, options);
        // chart.draw(data, google.charts.Line.convertOptions(options));
    }
});
