/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Vehicle Accident Numbers', // (Provide a story title)
        subTitle: 'The number of accidents per type of vehicle.', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
        // scroll: true, // (Should the story vertically scroll its content?)
    },
    
    years: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-cycling';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var years = [];
                
                data.forEach(function (item) {
                    var year = moment(new Date(item.Year)).format('YYYY-MM-DD');
                    
                    years.push([
                        new Date(year),
                        parseFloat(item['Cycling']),
                        parseFloat(item['Car']),
                        parseFloat(item['Bus or Coach']),
                        parseFloat(item['Taxi']),
                        parseFloat(item['Goods Vehicle']),
                        parseFloat(item['Motorcycle'])
                    ]);
                });
                
                _this.set('years', years);
                
                console.log(_this.years);
                
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
        
        data.addColumn('date', 'Year');
        data.addColumn('number', 'Cycling');
        data.addColumn('number', 'Car');
        data.addColumn('number', 'Bus or Coach');
        data.addColumn('number', 'Taxi');
        data.addColumn('number', 'Goods Vehicle');
        data.addColumn('number', 'Motorcycle');

        data.addRows(this.years);

        var options = {
            title: '',
            legend: {
                position: 'none'
            },
            width: 290,
            height: 394,
            pointSize: 0,
            lineWidth: 2,
            interpolateNulls: true,
            chartArea: {
                width: '80%',
                height: '75%',
                top: '15%',
                left: '15%'
            },
            hAxis: {
                title: 'Year',
                format: 'yyyy',
                gridlines: {
                    count: 7
                }
            },
            vAxis: {
                // format: 'number'
            },
            crosshair: {
                trigger: 'both'
            },
            legend: {
                position: 'top',
                maxLines: '4'
            },
            fontSize: 10,
            isStacked: true
        };

        var chart = new google.visualization.AreaChart(document.getElementById('rta-vehicle-accidents'));

        chart.draw(data, options);
    }
});
