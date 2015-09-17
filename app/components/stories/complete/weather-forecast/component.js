/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    author: 'Simon Zimmerman',
    showDay: true,

    didReceiveAttrs: function () {
        this.set('title', 'Weather');
        this.set('subTitle', '5-day weather forecast for Leeds');

        var obj = this;
        var url = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/352241?res=daily&key=f74b2d5f-4fd7-450a-b410-ed56d842a209';

        this.getData(url)
            .then(
                function (data) {
                    var days = [];

                    data.SiteRep.DV.Location.Period.forEach((tmpItem) => {
                        var id = hebeutils.guid();
                        var day = {
                            day: {
                                windDirection: tmpItem.Rep[0].D,
                                //windDirectionSVG: obj.getCompassSVG(tmpItem.Rep[0].D),
                                windGust: tmpItem.Rep[0].Gn,
                                windSpeed: tmpItem.Rep[0].S,
                                maxTemp: tmpItem.Rep[0].Dm,
                                minTemp: tmpItem.Rep[1].Nm,
                                feelsLike: tmpItem.Rep[0].Fdm,
                                humidity: tmpItem.Rep[0].Hn,
                                visibility: tmpItem.Rep[0].V,
                                rainProb: tmpItem.Rep[0].PPd,
                                uv: tmpItem.Rep[0].U,
                                weather: obj.getWeatherType(tmpItem.Rep[0].W),
                                weatherIcon: obj.getWeatherType(tmpItem.Rep[0].W, true)
                                //weatherDescription: obj.getWeatherTypes(tmpItem.Rep[0].W)
                            },
                            night: {
                                windDirection: tmpItem.Rep[1].D,
                                //windDirectionSVG: obj.getCompassSVG(tmpItem.Rep[1].D),
                                windGust: tmpItem.Rep[1].Gm,
                                wiSpeed: tmpItem.Rep[1].S,
                                maxTemp: tmpItem.Rep[0].Dm,
                                minTemp: tmpItem.Rep[1].Nm,
                                feelsLike: tmpItem.Rep[1].Fnm,
                                humidity: tmpItem.Rep[1].Hm,
                                visibility: tmpItem.Rep[1].V,
                                rainProb: tmpItem.Rep[1].PPn,
                                uv: tmpItem.Rep[0].U,
                                weather: obj.getWeatherType(tmpItem.Rep[1].W),
                                weatherIcon: obj.getWeatherType(tmpItem.Rep[1].W, true)
                            },
                            date: tmpItem.value.toString().ensureNoEndingString('Z')
                        };
                        days.push(day);
                    });
                    obj.set('days', days);
                    obj.set('today', days[0]);
                    setTimeout(() => {
                        obj.set('loaded', true);
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

    // compassSVG: function(windDirection) {
    //   //   var points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    //   //   var svg = '';
    //   // for (i = 0; i < points.length; i++) {
    //   //   if (windDirection === points[i]) {
    //   //     console.log('success, direction = ' + points[i]);
    //       // svg = 'svg-compass-' + wind[i];
    //       return 'svg-compass-' + windDirection;
    //       // var weatherSVG = 'svg-weather-' + i;
    //     // }
    //   // };
    // }

    getWeatherType: function (weatherIndex, icon) {
        // weatherIndex = weatherIndex - 1;
        var types = [
            ['default', 'Clear night'],
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

        console.log(weather[0]);
    },

    actions: {
        togglePeriod(period) {
            this.set('showDay', (period == 'day'));
        }
    }
});

