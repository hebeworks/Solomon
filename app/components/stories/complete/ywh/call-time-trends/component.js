/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Call Time Trends', // (Provide a story title)
        subTitle: 'What time of day are calls received?', // (Provide a story subtitle)
        scroll: true, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    calls: [],
    
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        var _this = this;
        google.setOnLoadCallback(function () { _this.drawChart() });
    }.on('didInsertElement'),
    
    onDayInit: function () {
        this.get('appSettings.canvasSettings.ywData');
        this.get('ywData');
    }.on('init'),
    
    drawChart: function() {
        var _this = this,
            ywData = this.get('appSettings.canvasSettings.ywData');
            
        if (!Ember.isEmpty(ywData)) {
            var calls = [],
                times = ['Morning', 'Afternoon', 'Evening', 'Night'],
                callHours = _.countBy(ywData, function(item) {
                    var hour = moment(new Date(item['Start Call'])).format('HH');
                    
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
                hAxis: {
                    title: 'Period'
                },
                chartArea: {
                    width: '85%',
                    height: '80%',
                    top: '5%',
                    left: '10%'
                },
                tooltip: {
                    isHtml: true
                }
            };

            var chart = new google.visualization.LineChart(document.getElementById('call-time-trends-chart'));
            // var chart = new google.charts.Line(document.getElementById('call-time-trends-chart'));

            chart.draw(data, options);
            // chart.draw(data, google.charts.Line.convertOptions(options));
        }
    }.observes('ywData')
});
