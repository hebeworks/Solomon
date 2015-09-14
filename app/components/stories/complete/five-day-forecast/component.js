/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    author: 'Simon Zimmerman',
    didInsertElement: function() {
        this.set('title', 'Weather Forecast');
        this.set('subTitle', 'A five day forecast from the Met Office');
        var obj = this;
        // datamillUrl is a property containing the url for Leeds Data Mill
            // inherited from story-types/datamill-story
        var url = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/352241?res=daily&key=f74b2d5f-4fd7-450a-b410-ed56d842a209';
        // getData is a function inherited from 
            // story-types/default-story (which story-types/datamill-story extends)
            // it provides an easy way to make AJAX requests
            // returning a Promise (.then())
                // to which you can pass
                // success, failure, and complete callbacks
        this.getData(url)
            .then(
                function(data){
                    // debugger;
                    // success
                    // console.log('five-day-forecast > getData > success');
                    // data is the response Object/Array from the AJAX request
                    var days = [];
                    data.SiteRep.DV.Location.Period.forEach((tmpItem) => {
                        var id = hebeutils.guid();
                        var day = {
                            day: {
                                windDirection: tmpItem.Rep[0].D,
                                //windDirectionSVG: obj.getCompassSVG(tmpItem.Rep[0].D),
                                windGust: tmpItem.Rep[0].Gn,
                                temperature: tmpItem.Rep[0].Dm,
                                feelsLike: tmpItem.Rep[0].Fdm,
                                humidity: tmpItem.Rep[0].Hn,
                                visibility: tmpItem.Rep[0].V,
                                rainProbability: tmpItem.Rep[0].PPd,
                                weather: tmpItem.Rep[0].W
                                //weatherDescription: obj.getWeatherTypes(tmpItem.Rep[0].W)
                            },
                            night: {
                                windDirection: tmpItem.Rep[1].D,
                                //windDirectionSVG: obj.getCompassSVG(tmpItem.Rep[1].D),
                                windGust: tmpItem.Rep[1].Gm,
                                temperature: tmpItem.Rep[1].Nm,
                                feelsLike: tmpItem.Rep[1].Fnm,
                                humidity: tmpItem.Rep[1].Hm,
                                visibility: tmpItem.Rep[1].V,
                                rainProbability: tmpItem.Rep[1].PPn,
                                weather: tmpItem.Rep[1].W
                            },
                            date: tmpItem.value
                        };
                        days.push(day);
                    });
                    obj.set('days', days);
                    obj.set('today', days[0]);
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function(error) {
                    // failure
                    // console.log('five-day-forecast > getData > error: ' + error);
                },
                function(){
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

    // weatherTypes: function(weather) {
    //     var types = [
    //         'Clear night',
    //         'Sunny day',
    //         'Partly cloudy (night)',
    //         'Partly cloudy (day)',
    //         'Not used',
    //         'Mist',
    //         'Fog',
    //         'Cloudy',
    //         'Overcast',
    //         'Light rain shower (night)',
    //         'Light rain shower (day)',
    //         'Drizzle',
    //         'Light rain',
    //         'Heavy rain shower (night)',
    //         'Heavy rain shower (day)',
    //         'Heavy rain',
    //         'Sleet shower (night)',
    //         'Sleet shower (day)',
    //         'Sleet',
    //         'Hail shower (night)',
    //         'Hail shower (day)',
    //         'Hail',
    //         'Light snow shower (night)',
    //         'Light snow shower (day)',
    //         'Light snow',
    //         'Heavy snow shower (night)',
    //         'Heavy snow shower (day)',
    //         'Heavy snow',
    //         'Thunder shower (night)',
    //         'Thunder shower (day)',
    //         'Thunder'
    //     ];
    //     console.log(types);
    //     //return types[weather];
    // }
});
