/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Pedestrian Accidents By Month', // (Provide a story title)
        subTitle: 'Grouped monthly pedestrian casualty numbers.', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        // width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
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
                
                data.forEach(function (item) {
                    var shortMonth = item.Month.substring(0,3),
                        usableMonth = moment(new Date(shortMonth + '1, 2014')).format('YYYY-MM-DD');
                    
                    months.push([
                        new Date(usableMonth),
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                months.sort(function(a,b){
                  return new Date(a[0]) - new Date(b[0]);
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
        
        data.addColumn('date', 'Month');
        data.addColumn('number', 'Casualties');
        
        // data.addColumn({
        //     type: 'string', 
        //     role: 'tooltip'
        // });

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
                format: 'MMM',
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
