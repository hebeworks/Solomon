/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Leeds Information Centre',
        subTitle: 'Visitor Numbers',
        author: 'Ste Allan',
        
        description: 'A chart showing visitor numbers to Leeds Information Centre over a 13-month period.', // (Provide a longer description of the story)
        license: 'UK Open Government Licence (OGL v2)', // (Define which license applies to usage of the story)
        dataSourceUrl: 'http://leedsdatamill.org/dataset/leeds-visitor-centre-footfall', // (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com',
        
        scroll: false
    },
    
    months: [],
    
    onInsertElement: function () {
        this.fetchData();
        this.loadGoogleAPIs();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'leeds-visitor-centre-footfall';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var months = [];
                
                data.forEach(function (item) {
                    var month = [],
                        date = moment(new Date(item.date)).format('YYYY-MM-DD');

                    months.push([
                        new Date(date),
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
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(this.drawChart());
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
                    count: 12
                }
            },
            vAxis: {
                format: 'short'
            },
            chartArea: {
                width: '85%',
                height: '80%',
                top: '5%',
                left: '10%'
            },
            crosshair: {
                trigger: 'both',
                opacity: 0.5
            },
            selectionMode: 'multiple'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
});
