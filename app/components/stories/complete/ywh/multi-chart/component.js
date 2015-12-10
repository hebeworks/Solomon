/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'WQ Contacts Zone Information', // (Provide a story title)
        subTitle: 'Properties, population, meters and more', // (Provide a story subtitle)
        // color: 'lime', // (Set the story colour)
        width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '2', // (Set the height of the story)
        // slider: false, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },

    numberProperties: 0,
    numberPeople: 0,

    onInsertElement: function () {
        var _this = this;

        this.set('loaded', true);

        // this.detectScreenSize();
        // this.$(window).on('resize', function () {
        //     _this.detectScreenSize();
        // });
        this.get('selectedZone');
        
    }.on('didInsertElement'),

    selectedZone: Ember.computed.alias('appSettings.canvasSettings.ywFilter.selectedZone'),


    loadGoogleAPIs: function () {
        // Draw the chart when the APIs have loaded
        google.setOnLoadCallback(
        // this.drawChart1(),
        // this.drawChart2()
            );
    }.observes('loaded'),

test: function() {
    
},

    sumProperties: function (arr, propertiesToSum) {
        var results = {};
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            for (var p = 0; p < propertiesToSum.length; p++) {
                var prop = propertiesToSum[p];
                if (!Ember.isEmpty(element[prop])) {
                    if (results[prop] == null) {
                        results[prop] = parseInt(element[prop]);
                    } else {
                        results[prop] += parseInt(element[prop]);
                    }
                }
            }
        }
        return results;
    },

    loadData: function () {
        var _this = this;
        this.getData(this.get('appSettings.hebeNodeAPI') + '/yw-zones?query=' + this.get('appSettings').encodeQuery({ waterSupplySystem: this.get('selectedZone.id') }))
            .then(function (data) {
                var propertiesToSum = [
                    "propertiesMeteredDomestic",
                    "propertiesMeteredCommercial",
                    "propertiesNonMeteredDomestic",
                    "propertiesNonMeteredCommercial",
                    "population",
                    "propertiesTotal",
                    "propertiesMeteredTotal",
                    "propertiesNonMeteredTotal"
                ];

                var summed = _this.sumProperties(data, propertiesToSum);
                summed.population = summed.population;
                _this.set('summed', summed);
            });
    }.observes('selectedZone'),




    drawChart1: function () {
        var summed = this.get('summed');
        if (!Ember.isEmpty(summed.propertiesMeteredTotal)) {

            var metered = summed.propertiesMeteredTotal;
            var nonMetered = summed.propertiesNonMeteredTotal;

            var arr = [
                ['Account Type', 'Number of Properties'],
                ['Metered', metered],
                ['Unmetered', nonMetered]
            ];
            
            // console.log(arr);

            var data = google.visualization.arrayToDataTable(arr);
            
            var options = {
                chartArea: {
                    width: '86%',
                    height: '73%',
                    top: '20%',
                    left: '7%'
                },
                width: 145,
                height: 127,
                // title: 'Metered/Unmetered',
                titleTextStyle: {
                    fontSize: 9
                },
                legend: {
                    position: 'top',
                    maxLines: 2
                },
                slices: {
                    0: {
                        color: '#00b5ef'
                    },
                    1: {
                        color: '#92cfda'
                    }
                },
                pieHole: 0.8
            };

            var chart = new google.visualization.PieChart(document.getElementById('multi-pie-1'));
            chart.draw(data, options);
        }
    }.observes('summed'),


    drawChart2: function () {
        var summed = this.get('summed');
        if (!Ember.isEmpty(summed.propertiesMeteredCommercial)) {

            var commercial = (summed.propertiesMeteredCommercial + summed.propertiesNonMeteredCommercial);
            var domestic = (summed.propertiesMeteredDomestic + summed.propertiesNonMeteredDomestic);

            var arr = [
                ['Property Type', 'Number of Properties'],
                ['Commercial', commercial],
                ['Domestic', domestic]
            ];
            
            // console.log(arr);
            
            var data = google.visualization.arrayToDataTable(arr);


            var options = {
                chartArea: {
                    width: '86%',
                    height: '73%',
                    top: '20%',
                    left: '7%'
                },
                width: 145,
                height: 127,
                legend: {
                    position: 'top',
                    maxLines: 2
                },
                slices: {
                    0: {
                        color: '#00b5ef'
                    },
                    1: {
                        color: '#92cfda'
                    }
                },
                pieHole: 0.8
            };

            var chart = new google.visualization.PieChart(document.getElementById('multi-pie-2'));
            chart.draw(data, options);
        }

    }.observes('summed'),

    detectScreenSize: function () {
        if (Modernizr.mq('only screen and (min-width: 680px')) {
            this.set('storyConfig.width', 4);
            this.set('storyConfig.height', 1);
        } else {
            this.set('storyConfig.width', 2);
            this.set('storyConfig.height', 2);
        }
    }
});
