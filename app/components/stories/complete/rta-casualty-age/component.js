/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'Pedestrian Casualty Age', // (Provide a story title)
        subTitle: 'Number of predestrian casualties for 10-year age ranges', // (Provide a story subtitle)
        author: 'Liam Bolton', // (Provide the author of the story)
        
        description: 'A chart showing the number of pedestrian casualties for 10-year age ranges for the period 2009-2014.', // (Provide a longer description of the story)
        feedbackEmail: 'liamthomasbolton@gmail.com',
        dataSourceUrl: 'http://leedsdatamill.org/dataset/pedestrian-casualties-in-leeds/resource/254678e1-8f79-4015-b886-d2138efc4aef', // (Where did the data come from?)
        
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    ages: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-age';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var ages = [];
                
                data.forEach(function (item) {
                    var age = [],
                        ageNumber = parseFloat(item.Age),
                        ageRangeUpper = ageNumber + 9,
                        ageRange = item.Age + '-' + ageRangeUpper;

                    ages.push([
                        ageRange,
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                _this.set('ages', ages);
                
                // console.log(_this.ages);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            });
    },
    
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(this.drawChart());
    }.observes('loaded'),

    drawChart: function() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('string', 'Age Range');
        data.addColumn('number', 'Casualties');

        data.addRows(this.ages);

        var options = {
            width: 290,
            height: 220,
            legend: {
                position: 'none'
            },
            pointSize: 5,
            hAxis: {
                title: '',
            },
            vAxis: {
                minorGridlines: {
                    count: 3
                }
            },
            chartArea: {
                width: '90%',
                height: '80%',
                top: '5%',
                left: '10%'
            },
            crosshair: {
                trigger: 'both',
                opacity: 0.5
            },
            selectionMode: 'multiple',
            series: {
                0: {
                    color: '#026DBE'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('rta-casualty-age-chart'));

        chart.draw(data, options);
    }
});
