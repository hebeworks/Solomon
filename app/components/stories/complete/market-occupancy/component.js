/* global Ember, hebeutils, _, google, moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'Leeds Outside Markets', // (Provide a story title)
        subTitle: 'Statistics for Leeds city, Yeadon, Pudsey and Otley', // (Provide a story subtitle)
        author: 'Ste Allan',

        description: 'A chart showing how market stall occupancy has changed over a 13-month period.', // (Provide a longer description of the story)
        license: 'UK Open Government Licence (OGL v2)', // (Define which license applies to usage of the story)
        dataSourceUrl: 'http://leedsdatamill.org/dataset/leeds-markets', // (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com', // (Provide an email users can contact about this story)

        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    loaded: false,
    
    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),

    loadData: function () {
        var _this = this;
        var query = { $and: [ { "date" : { $lte : new Date("2014-03-31T00:00:00Z") } },  
                              { "date" : { $gte : new Date("2014-03-01T00:00:00Z") } }
                    ]}; 
        var url = this.get('hebeNodeAPI') + '/ldm-market-occupancy?query=' + this.convertQuery(query)
            + '&limit=-1';
        this.getData(url)
            .then(function (data) {
                if (!Ember.isEmpty(data)) {
                    _this.parseData(data);
                }
            });
    },

    parseData: function (data) {
        var _this = this;
        var chartData = [];
        chartData[0] = ['Day', 'Leeds', 'Pudsey', 'Otley', 'Yeadon'];
        for(var i = 1; i <= 31; i ++) {
            // [1,144,null,12,null];
            chartData[i] = [null,null,null,null,null];
        }
        data.forEach(function (obj) {
            obj.occupied = obj.stalls_available - obj.stalls_void;
            obj.percent = obj.stalls_void / obj.stalls_available;
            var locationIndex = chartData[0].indexOf(obj.location);
            var dayOfMonth = moment(new Date(obj.date)).date();
            chartData[dayOfMonth][locationIndex] = obj.occupied;
        });
        this.set('chartData',chartData);
        _this.set('loaded', true);
    },

    loadGoogleAPIs: function () {
        var _this = this;
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            _this.drawLineChart()
        );
    }.observes('loaded'),

    convertQuery: function (query) {
        var json = JSON.stringify(query);
        var base64 = hebeutils.Base64.encode(json);
        return base64;
    },

    drawLineChart: function () {
        var chartData = this.get('chartData');
        
        var data = new google.visualization.DataTable();
        // data = google.visualization.arrayToDataTable([
        //     ['Week', 'Tuesday', 'Sunday'],
        //     ['1', .85, .78],
        //     ['2', .76, .80],
        //     ['3', .68, .89],
        //     ['4', .50, .94]
        // ]);

        data = google.visualization.arrayToDataTable(chartData);

        var options = {
            title: 'Line Chart',
            legend: { position: 'top' },
            width: 290,
            height: 220,
            pointSize: 5,
            chartArea: {
                width: '85%',
                height: '55%',
                top: '20%',
                left: '15%'
            },
            hAxis: {
                title: 'Week'
            },
            vAxis: {
                format: 'percent'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('google-line-chart'));
        chart.draw(data, options);
    }
});
