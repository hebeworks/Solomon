/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Pedestrian Accidents by Month', // (Provide a story title)
        subTitle: 'Grouped monthly pedestrian casualty numbers', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        description: 'A chart showing the cummulative number of pedestrian casualties for months for the period 2009-2014.', // (Provide a longer description of the story)
        dataSourceUrl: 'http://leedsdatamill.org/dataset/pedestrian-casualties-in-leeds/resource/3e292a04-5cde-42c5-acf2-a2b4c7ad2234', // (Where did the data come from?)
        
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    months: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-monthly';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var months = [];
                var monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                
                data = _.sortBy(data, function(item) {
                    return monthsOfYear.indexOf(item.Month);
                });
                
                data.forEach(function (item) {
                    var shortMonth = item.Month.substring(0,3);
                    
                    months.push([
                        shortMonth,
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                _this.set('months', months);
                
                // console.log(_this.months);
                
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
        
        data.addColumn('string', 'Month');
        data.addColumn('number', 'Casualties');

        data.addRows(this.months);

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

        var chart = new google.visualization.LineChart(document.getElementById('rta-monthly-accidents'));

        chart.draw(data, options);
    }
});
