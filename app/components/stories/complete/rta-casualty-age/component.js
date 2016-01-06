/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Casualty Age', // (Provide a story title)
        subTitle: 'The number of casualties for 10-year age ranges.', // (Provide a story subtitle)
        author: 'Ste Allan', // (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '2', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
        // scroll: true, // (Should the story vertically scroll its content?)
    },
    
    ages: [],
    
    onInsertElement: function () {
        this.fetchData();
    }.on('didInsertElement'),
    
    fetchData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'ldm-accidents-age';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var ages = [];
                
                data.forEach(function (item) {
                    var age = [],
                        ageNumber = parseFloat(item.Age),
                        ageRangeUpper = ageNumber + 9,
                        ageRange = item.Age + '-' + ageRangeUpper;

                    ages.push([
                        ageRange,
                        parseFloat(item['Number of Casualties'])
                    ]);
                });
                
                _this.set('ages', ages);
                
                // console.log(_this.ages);
                
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
        
        data.addColumn('string', 'Age Range');
        data.addColumn('number', 'Casualties');

        data.addRows(this.ages);

        var options = {
            width: 290,
            height: 220,
            legend: {
                position: 'none'
            },
            pointSize: 5,
            hAxis: {
                title: '',
            },
            chartArea: {
                width: '90%',
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

        var chart = new google.visualization.ColumnChart(document.getElementById('rta-casualty-age-chart'));

        chart.draw(data, options);
    }
});
