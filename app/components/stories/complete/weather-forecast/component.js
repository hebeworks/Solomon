/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    initialConfig: {
        title: 'Weather',
        subTitle: '',
        width: '2',
        height: '1',
        dataSourceUrl: 'http://datapoint.metoffice.gov.uk',
        feedbackEmail: 'support@hebeworks.com',
        description: 'This Story uses Met Office data via the Data Point service',
        license: 'This information is licensed under the terms of the Open Government Licence',
        author: 'Ste Allan',
        showHeaderBorder: false,
        showLoading: true,
        viewOnly: true,
        scroll: false
    },
    day: null,
    showDay: true,

    didReceiveAttrs: function () {        
        var obj = this;
        var url = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/352241?res=daily&key=f74b2d5f-4fd7-450a-b410-ed56d842a209';
        
        // If we're on the BID app, change the story colour
        if (this.get('appSettings.solomonConfig.name') == 'bid') {
            obj.setProperties({
                'initialConfig.color': 'white',
                'initialConfig.author': ''
            });
        }

        this.getData(url)
            .then(
                function (data) {
                    const period = data.SiteRep.DV.Location.Period[0];
                    var day = {
                        day: {
                            maxTemp: period.Rep[0].Dm,
                            minTemp: period.Rep[1].Nm,
                            weather: obj.getWeatherType(period.Rep[0].W),
                            weatherIcon: obj.getWeatherType(period.Rep[0].W, true),
                            rainProb: period.Rep[0].PPd,
                        },
                        night: {
                            maxTemp: period.Rep[0].Dm,
                            minTemp: period.Rep[1].Nm,
                            weather: obj.getWeatherType(period.Rep[1].W),
                            weatherIcon: obj.getWeatherType(period.Rep[1].W, true),
                            rainProb: period.Rep[1].PPn,
                        }
                    };
                    
                    setTimeout(() => {
                        obj.set('loaded', true);
                        obj.set('day', day);
                        Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    });
                },
                function (error) {
                    // failure
                    // console.log('five-day-forecast > getData > error: ' + error);
                },
                function () {
                    // complete
                }
            )
    },

    getWeatherType: function (weatherIndex, icon) {
        // weatherIndex = weatherIndex - 1;
        var types = [
            ['clear-night', 'Clear night'],
            ['sunny', 'Sunny day'],
            ['cloudy', 'Partly cloudy (night)'],
            ['cloudy', 'Partly cloudy (day)'],
            ['default', 'Not used'],
            ['mist', 'Mist'],
            ['fog', 'Fog'],
            ['cloudy', 'Cloudy'],
            ['overcast', 'Overcast'],
            ['light-rain', 'Light rain shower (night)'],
            ['light-rain', 'Light rain shower (day)'],
            ['light-rain', 'Drizzle'],
            ['light-rain', 'Light rain'],
            ['heavy-rain', 'Heavy rain shower (night)'],
            ['heavy-rain', 'Heavy rain shower (day)'],
            ['heavy-rain', 'Heavy rain'],
            ['sleet', 'Sleet shower (night)'],
            ['sleet', 'Sleet shower (day)'],
            ['sleet', 'Sleet'],
            ['hail', 'Hail shower (night)'],
            ['hail', 'Hail shower (day)'],
            ['hail', 'Hail'],
            ['light-snow', 'Light snow shower (night)'],
            ['light-snow', 'Light snow shower (day)'],
            ['light-snow', 'Light snow'],
            ['heavy-snow', 'Heavy snow shower (night)'],
            ['heavy-snow', 'Heavy snow shower (day)'],
            ['heavy-snow', 'Heavy snow'],
            ['thunder', 'Thunder shower (night)'],
            ['thunder', 'Thunder shower (day)'],
            ['thunder', 'Thunder']
        ];

        var weather = types[weatherIndex];
        if (icon == true) {
            return weather[0] + '-grey';
        } else {
            return weather[1];
        }
    },
    
    onShowDay: function() {
        setTimeout(function() {
            Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
        });
    }.observes('showDay'),

    actions: {
        togglePeriod(period) {
            this.$('[spc-forecast-graphic_inner]').attr('data-grunticon-embed', '');
            this.set('showDay', (period == 'day'));
        }
    }
});

