/* global Ember, hebeutils, _, google, moment, s */
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
        this.getDateRange();
        this.get('months');
        this.get('startDate');
        this.get('endDate');
    }.on('didInsertElement'),

    startDate: null, // new Date("2014-03-01T00:00:00Z"),
    endDate: null, // new Date("2014-03-31T00:00:00Z"),
    
    getDateRange: function () {
        var _this = this;
        this.getData(this.get('appSettings.hebeNodeAPI') + '/ldm-market-occupancy?sort=date&sortdirection=DESC&limit=1')
            .then(function (mostRecent) {
                if (!Ember.isEmpty(mostRecent)) {
                    var start = new Date(mostRecent[0].date);
                    _this.set('startDate', start);
                }
            });
        this.getData(this.get('appSettings.hebeNodeAPI') + '/ldm-market-occupancy?sort=date&sortdirection=ASC&limit=1')
            .then(function (endDate) {
                if (!Ember.isEmpty(endDate)) {
                    var end = new Date(endDate[0].date);
                    _this.set('endDate', end);
                }
            });
    },

    selectedMonth: null,
    months: [],
    setMonths: function () {
        var _this = this;
        if (!Ember.isEmpty(this.get('startDate')) && !Ember.isEmpty('endDate')) {
            var months = [];
            var endDate = moment(this.get('endDate'));
            var current = moment(this.get('startDate'));
            var i = 0;
            while (new Date(current) > endDate) {
                i++;
                months.push({ id: current.toISOString(), text: current.format('MMM YYYY') });
                current = current.subtract(1, 'months');
            }
            _this.set('months', months);
            _this.set('selectedMonth', months[0]);
        }
    }.observes('startDate', 'endDate'),

    loadData: function () {
        if (!Ember.isEmpty(this.get('selectedMonth'))) {
            var newDate = new Date(this.get('selectedMonth').id);

            var _this = this;
            var startDate = moment(newDate).toISOString();
            var endDate = moment(moment(startDate).subtract(1, "months").toDate()).toISOString();

            var query = { $and: [{ "date": { $lte: startDate } }, { "date": { $gte: endDate } }] };
            var url = this.get('appSettings.hebeNodeAPI') + '/ldm-market-occupancy?query=' + this.get('appSettings').encodeQuery(query) + '&limit=-1';

            console.log(url);

            this.getData(url)
                .then(function (data) {
                    if (!Ember.isEmpty(data)) {
                        _this.parseData(data);
                    }
                });
        }
    }.observes('selectedMonth'),

    parseData: function (data) {
        var _this = this;
        var chartData = [];
        chartData[0] = ['Day', 'Leeds', 'Pudsey', 'Otley', 'Yeadon'];
        // chartData[0] = ['Day', 'Leeds', 'Pudsey', 'Otley', 'Yeadon','tooltip'];
        for (var i = 1; i <= 31; i++) {
            // [1,144,null,12,null];
            chartData[i] = [i, null, null, null, null];
            // chartData[i] = [i,null,null,null,null,moment(new Date("2014/03/"+i)).format('D MMM')];
        }

        var occupancyData = JSON.parse(JSON.stringify(chartData));
        var percentageData = JSON.parse(JSON.stringify(chartData));
                
        // ================================================================================
        // Calculate daily averages
        // ================================================================================
        function baseLocObj() {
            return {
                "Leeds": [],
                "Pudsey": [],
                "Otley": [],
                "Yeadon": []
            };
        }
        var days = {
            'Mon': baseLocObj(),
            'Tue': baseLocObj(),
            'Wed': baseLocObj(),
            'Thu': baseLocObj(),
            'Fri': baseLocObj(),
            'Sat': baseLocObj(),
            'Sun': baseLocObj()
        };

        var dailyAverages = [chartData[0]];
        data.forEach(function (obj) {
            obj.occupied = obj.stalls_available - obj.stalls_void;
            obj.percent = obj.stalls_void / obj.stalls_available;
            var locationIndex = chartData[0].indexOf(obj.location);
            var dayOfMonth = moment(new Date(obj.date)).date();
            occupancyData[dayOfMonth][locationIndex] = obj.occupied;
            percentageData[dayOfMonth][locationIndex] = obj.percent;
            
            // Daily averages
            var day = moment(new Date(obj.date)).format("ddd");
            days[day][obj.location].push(obj.occupied);
        });

        function forEachProp(obj, callback) {
            for (var prop in obj) {
                callback(prop, obj[prop]);
            }
        }
        
        // foreach day
        forEachProp(days, function (day, dayObj) {
            var arr = [day];
            // foreach location
            forEachProp(dayObj, function (loc, locArr) {
                // calculate the average            
                var sum = _.reduce(locArr, function (mem, num) { return mem + num; });
                var average = sum / locArr.length;
                arr.push(average);
            });
            dailyAverages.push(arr);
        });
        // ================================================================================
        
        this.setProperties({
            occupancyData: occupancyData,
            percentageData: percentageData,
            dailyAverages: dailyAverages
        });
        _this.set('loaded', true);
    },

    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
        // this.drawTotalOccupiedStalls(),
        // this.drawPCEmptyStalls(),
        // this.drawAvgOccupiedStalls()
            );
    }.observes('loaded'),

    drawTotalOccupiedStalls: function () {
        var chartData = this.get('occupancyData'),
            data = new google.visualization.DataTable();
        
        // Original
        // data = google.visualization.arrayToDataTable(chartData);
        
        // New
        data.addColumn('number', 'Day of Month');
        data.addColumn('number', 'Leeds');
        data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
        data.addColumn('number', 'Yeadon');
        data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
        data.addColumn('number', 'Otley');
        data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
        data.addColumn('number', 'Pudsey');
        data.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
        var selectedMonth = new Date();
        function htmlTooltip(day, val) {
            var date = moment(s.lpad(day, 2, "0") + moment(selectedMonth).format("/MM/YYYY"), "DD/MM/YYYY");
            date = date.format('ddd') + '&nbsp;' + date.format('Do');
            return '<div style="padding:4px;">' + date + '<br />' + val + '&nbsp;stalls</div>';
        }

        var rows = _.map(chartData.splice(1), function (row) {
            return [
                row[0], // day
                row[1], // leeds value
                htmlTooltip(row[0], row[1]), // leeds tooltip
                row[2], // yeadon value
                htmlTooltip(row[0], row[2]), // yeadon tooltip
                row[3], // otley value
                htmlTooltip(row[0], row[3]), // otley tooltip
                row[4], // pudsey value
                htmlTooltip(row[0], row[4]) // pudsey tooltip
            ];
        });
        // data.addRows([
        //     [1, 132, 'Leeds tooltip', null, 'Yeadon tooltip', 50, 'Otley tooltip', 3, 'Pudsey tooltip'],
        //     [2, 178, 'Leeds tooltip', 3, 'Yeadon tooltip', 13, 'Otley tooltip', 5, 'Pudsey tooltip'],
        //     [3, 154, 'Leeds tooltip', null, 'Yeadon tooltip', 35, 'Otley tooltip', 10, 'Pudsey tooltip']
        // ]);
        
        data.addRows(rows);

        var options = {
            title: 'Daily Number of Occupied Stalls',
            legend: {
                position: 'top',
                maxLines: '4'
            },
            tooltip: {
                isHtml: true
            },
            width: 290,
            height: 345,
            pointSize: 0,
            lineWidth: 2,
            interpolateNulls: true,
            chartArea: {
                width: '85%',
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
            crosshair: {
                trigger: 'both'
            },
            series: {
                1: {
                    color: '#f7a700'
                },
                2: {
                    color: '#f8e71c'
                },
                3: {
                    color: 'green'
                }
            },
            areaOpacity: 0.5
        };

        // var chart = new google.visualization.AreaChart(document.getElementById('chart-no-occupied-stalls'));
        var chart = new google.visualization.LineChart(document.getElementById('chart-no-occupied-stalls'));

        chart.draw(data, options);
    }.observes('occupancyData'),

    drawPCEmptyStalls: function () {
        var chartData = this.get('percentageData');
        // data = new google.visualization.DataTable();
        
        // Original
        var data = google.visualization.arrayToDataTable(chartData);
        
        // New
        // data.addColumn('number', 'Day of Month');
        // data.addColumn('number', 'Leeds');
        // data.addColumn({ type: 'string', role: 'tooltip' });
        // data.addColumn('number', 'Yeadon');
        // data.addColumn({ type: 'string', role: 'tooltip' });
        // data.addColumn('number', 'Otley');
        // data.addColumn({ type: 'string', role: 'tooltip' });
        // data.addColumn('number', 'Pudsey');
        // data.addColumn({ type: 'string', role: 'tooltip' });

        // data.addRows(chartData);

        var options = {
            title: 'Percentage of Stalls Empty',
            legend: {
                position: 'top',
                maxLines: '4'
            },
            width: 290,
            height: 345,
            pointSize: 0,
            lineWidth: 2,
            interpolateNulls: true,
            chartArea: {
                width: '80%',
                height: '60%',
                top: '20%',
                left: '15%'
            },
            hAxis: {
                title: 'Day of month',
                format: 'short'
            },
            vAxis: {
                format: 'percent',
                minorGridlines: {
                    count: 4
                }
            },
            crosshair: {
                trigger: 'both'
            },
            tooltip: {
                // isHtml: true
            },
            series: {
                1: {
                    color: '#f7a700'
                },
                2: {
                    color: '#f8e71c'
                },
                3: {
                    color: 'green'
                }
            },
            areaOpacity: 0.5
        };

        // var chart = new google.visualization.AreaChart(document.getElementById('chart-pc-empty-stalls'));
        var chart = new google.visualization.LineChart(document.getElementById('chart-pc-empty-stalls'));

        chart.draw(data, options);
    }.observes('percentageData'),

    drawAvgOccupiedStalls: function () {
        var chartData = this.get('dailyAverages');
        var data = new google.visualization.DataTable();
        data = google.visualization.arrayToDataTable(chartData);

        var options = {
            title: 'Daily Avg. Number of Occupied Stalls',
            vAxis: {
                baseline: 0,
                minorGridlines: {
                    count: 4
                }
            },
            chartArea: {
                width: '90%',
                height: '60%',
                top: '20%',
                left: '10%'
            },
            width: 290,
            height: 345,
            legend: {
                position: 'top',
                maxLines: '4'
            },
            isStacked: true,
            hAxis: {
                title: 'Day of the week'
            },
            tooltip: {
                isHtml: true
            },
            series: {
                1: {
                    color: '#f7a700'
                },
                2: {
                    color: '#f8e71c'
                },
                3: {
                    color: 'green'
                }
            },
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('chart-avg-occupied-stalls'));

        chart.draw(data, options);
    }.observes('dailyAverages')
});
