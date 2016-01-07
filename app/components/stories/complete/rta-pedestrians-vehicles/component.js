/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Vehicle-based Pedestrian Casualties', // (Provide a story title)
        subTitle: 'Number of pedstrian casualties caused by vehicle types', // (Provide a story subtitle)
        author: 'Liam Bolton', // (Provide the author of the story)
        
        description: 'A chart showing the number of pedestrian casualties and the vehicle types involved for the period 2009-2014.', // (Provide a longer description of the story)
        feedbackEmail: 'liamthomasbolton@gmail.com',
        dataSourceUrl: 'http://leedsdatamill.org/dataset/pedestrian-casualties-in-leeds/resource/cce44d14-629f-47c2-9c6c-c59528f0353c', // (Where did the data come from?)
        
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    vehicles: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-vehicle';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var vehicles = [];
                
                data.forEach(function (item) {
                    vehicles.push([
                        item['Vehicle Type'],
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                _this.set('vehicles', vehicles);
                
                // console.log(_this.vehicles);
                
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
        
        data.addColumn('string', 'Vehicle Type');
        data.addColumn('number', 'Casualties');

        data.addRows(this.vehicles);

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
                    count: 4
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

        var chart = new google.visualization.ColumnChart(document.getElementById('rta-pedestrians-vehicles'));

        chart.draw(data, options);
    }
});
