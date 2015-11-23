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
        
        height: '3', // (Set the height of the story)
        slider: true, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    loaded: false,
    
    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),
    
    loadData: function () {
        var _this = this;
        var query = { $and: [{ "date" : { $lte : new Date("2014-03-31T00:00:00Z") } }, { "date" : { $gte : new Date("2014-03-01T00:00:00Z") } }]}; 
        var url = this.get('hebeNodeAPI') + '/ldm-market-occupancy?query=' + this.convertQuery(query) + '&limit=-1';
        this.getData(url)
            .then(function (data) {
                if (!Ember.isEmpty(data)) {
                    _this.parseData(data);
                }
            });
    },
                
    loadGoogleAPIs: function() {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
            this.drawTotalOccupiedStalls(),
            this.drawPCEmptyStalls(),
            this.drawAvgOccupiedStalls()
        );
    }.observes('loaded'),
    
    drawTotalOccupiedStalls: function() {
        var chartData = this.get('chartData');
        var data = new google.visualization.DataTable();
        data = google.visualization.arrayToDataTable(chartData);

        // data.addColumn({
        //     type: 'string', 
        //     role: 'tooltip'
        // });

        var options = {
            title: 'Daily Number of Occupied Stalls',
            legend: {
                position: 'top',
                maxLines: '4'
            },
            width: 290,
            height: 390,
            pointSize: 3,
            lineWidth: 1,
            interpolateNulls: true,
            chartArea: {
                width: '90%',
                height: '60%',
                top: '20%',
                left: '10%'
            },
            hAxis: {
                title: 'Day of month'
            },
            vAxis: {
                minorGridlines: {
                    count: 4
                }
            },
            series: {
                0: { pointShape: 'circle' },
                1: { pointShape: 'triangle' },
                2: { pointShape: 'square' },
                3: { pointShape: 'diamond' }
            },
            crosshair: {
                trigger: 'both'
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart-no-occupied-stalls'));

        chart.draw(data, options);
    },
    
    parseData: function (data) {
        var _this = this;
        var chartData = [];
        chartData[0] = ['Day', 'Leeds', 'Pudsey', 'Otley', 'Yeadon'];
        // chartData[0] = ['Day', 'Leeds', 'Pudsey', 'Otley', 'Yeadon','tooltip'];
        for(var i = 1; i <= 31; i ++) {
            // [1,144,null,12,null];
            chartData[i] = [i,null,null,null,null];
            // chartData[i] = [i,null,null,null,null,moment(new Date("2014/03/"+i)).format('D MMM')];
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

    convertQuery: function (query) {
        var json = JSON.stringify(query);
        var base64 = hebeutils.Base64.encode(json);
        return base64;
    }
});
