/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Leeds Information Centre',
        subTitle: 'Visitor Numbers',
        author: 'Ste Allan',
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        scroll: false
    },
    
    months: [],
    
    onInsertElement: function () {
        this.fetchData();
        this.loadGoogleAPIs();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('hebeNodeAPI'),
            storyData = 'leeds-visitor-centre-footfall';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var months = [];
                
                data.forEach(function (item) {
                    var month = [];

                    months.push([
                        new Date(item.date),
                        item.count,
                        moment(new Date(item.date)).format('MMMM YYYY') + ': ' + item.count]);
                });
                
                _this.set('months', months.reverse());
                
                console.log(_this.months);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            });
    },
    
    loadGoogleAPIs: function() {
        var _this = this,
            // url = 'https://www.google.com/jsapi';
            url = "https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line']}]}";
        
        // $.getScript(url, function () {
            // alert('loaded');
            
            // Load the visialisation API
            // google.load('visualization', '1.1', {packages: ['line']});
            
            // Draw the chart when the APIs have loaded
            google.setOnLoadCallback(this.drawChart());
        // });
    }.observes('loaded'),

    drawChart: function() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('date', 'Month');
        data.addColumn('number', 'Visitors');
        
        data.addColumn({
            type: 'string', 
            role: 'tooltip'
        });

        data.addRows(this.months);

        var options = {
            width: 290,
            height: 220,
            legend: {
                position: 'none'
            },
            pointSize: 5,
            hAxis: {
                title: '',
                format: 'MMM yy',
                gridlines: {
                    count: 12,
                },
                viewWindowMode: 'maximized'
            },
            vAxis: {
                format: 'short',
                baselineColor: '#CCCCCC'
            },
            chartArea: {
                width: '85%',
                height: '80%',
                top: '5%',
                left: '10%'
            },
            animation: {
                startup: true,
                duration: 1000
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        // var chart = new google.charts.Line(document.getElementById('chart_div'));

        chart.draw(data, options);
        // chart.draw(data, google.charts.Line.convertOptions(options));
    }
});
