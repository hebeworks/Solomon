/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'WQ Contact Trends', // (Provide a story title)
        subTitle: 'What time of day are contacts received?', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    calls: [],
    
    // loadGoogleAPIs: function() {
    //     // Draw the chart when the APIs have loaded
    // }.on('didInsertElement'),
    
    onDayInit: function () {
        var _this = this;
        google.setOnLoadCallback();
        this.drawChart();
        // this.get('ywData');
        // this.drawChart();
    }.on('didInsertElement'),
    
    drawChart: function() {
        var _this = this,
            ywData = this.get('ywData');
            
        if (!Ember.isEmpty(ywData)) {
            var calls = [],
                times = ['Morning', 'Afternoon', 'Evening', 'Night'],
                callHours = _.countBy(ywData, function(item) {
                    var hour = moment(new Date(item['startCall'])).format('HH');
                    
                    // morning
                    if (hour >= 6 && hour < 12) {
                        return 'Morning';
                    }
                    
                    // afternoon
                    if (hour >= 12 && hour < 18) {
                        return 'Afternoon';
                    }
                    
                    // evening
                    if (hour >= 18 && hour <= 23) {
                        return 'Evening';
                    }
                    
                    // night
                    if (hour >= 0 && hour < 6) {
                        return 'Night';
                    }
                });
                
            times.forEach(function(prop) {
                calls.push([prop, callHours[prop]]);
            })
            
            _this.set('calls', calls);
            
            setTimeout(function () {
                _this.set('loaded', true);
            });
                
            var data = new google.visualization.DataTable();
            
            data.addColumn('string', 'Period');
            data.addColumn('number', 'Calls');

            data.addRows(this.calls);

            var options = {
                width: 290,
                height: 240,
                legend: {
                    position: 'none'
                },
                pointSize: 0,
                lineWidth: 3,
                hAxis: {
                    title: 'Period'
                },
                chartArea: {
                    width: '90%',
                    height: '80%',
                    top: '5%',
                    left: '10%'
                },
                tooltip: {
                    isHtml: true
                },
                series: {
                    0: {
                        color: '#00b5ef'
                    }
                },
                curveType: 'function'
            };

            var chart = new google.visualization.LineChart(document.getElementById('call-time-trends-chart'));
            // var chart = new google.charts.Line(document.getElementById('call-time-trends-chart'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Line.convertOptions(options));
        }
    }.observes('ywData')
});
