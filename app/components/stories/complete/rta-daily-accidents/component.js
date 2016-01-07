/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Pedestrian Accidents by Day', // (Provide a story title)
        subTitle: 'Grouped daily pedestrian casualty numbers', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        description: 'A chart showing the cummulative number of pedestrian casualties for days for the period 2009-2014.', // (Provide a longer description of the story)
        dataSourceUrl: 'http://leedsdatamill.org/dataset/pedestrian-casualties-in-leeds/resource/52c95333-51fb-48c0-b117-d7f8f7d7cbca', // (Where did the data come from?)
        
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    days: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-weekday';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var days = [];
                var daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
                
                data = _.sortBy(data, function(item) {
                    return daysOfWeek.indexOf(item.Weekday);
                });
                
                // console.log(data);
                
                data.forEach(function (item) {
                    days.push([
                        item.Weekday,
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                _this.set('days', days);
                
                // console.log(_this.days);
                
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
        
        data.addColumn('string', 'Day');
        data.addColumn('number', 'Casualties');

        data.addRows(this.days);

        var options = {
            width: 290,
            height: 220,
            legend: {
                position: 'none'
            },
            pointSize: 7,
            hAxis: {
                title: ''
            },
            vAxis: {
                format: 'short',
                baseline: 0,
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

        var chart = new google.visualization.LineChart(document.getElementById('rta-daily-accidents'));

        chart.draw(data, options);
    }
});
