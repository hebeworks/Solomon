/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    initialConfig: {
        color: 'black',
        width: '1',
        height: '1',
        viewOnly: true
    },
    
    didInsertElement: function () {
        this.loadAPIData();
    },

    loadAPIData: function (tomorrow) {
        var obj = this;
        var sunriseSelect = '';
        var url = 'http://api.sunrise-sunset.org/json?lat=53.8007554&lng=-1.5490774&date=today&formatted=0' + (tomorrow ? '&date=tomorrow': '');
        this.getData(url)
            .then(
                function (tmpItem) {
                    // console.log('sun-set > getData > success');
                    var id = hebeutils.guid();
                    var item = {
                        id: id,
                        sunset: tmpItem.results.sunset,
                    };
                    var millisecondsUntilNextRefresh = moment(new Date(item.sunset)).diff(moment(new Date()));
                    if(millisecondsUntilNextRefresh < 0) {
                        obj.loadAPIData(true);
                    } else {
                        setTimeout(function () { obj.loadAPIData(); }, millisecondsUntilNextRefresh);
                        item.sunsetFormatted = moment(new Date(item.sunset)).locale('en').format('H:mm A');
                        obj.set('item', item);
                        setTimeout(() => {
                            obj.set('loaded', true);
                        });
                    }
                },
                function (error) {
                    // console.log('sun-rise > getData > error: ' + error);
                },
                function () {

                }
                )
    },

    setCountdown: function () {
        var obj = this;
        if (!(obj.get('isDestroyed') || obj.get('isDestroying'))) {
            setTimeout(function () {
                obj.setCountdown();
            }, 1000)
            var timeUntilSunset = moment(moment(new Date(obj.get('item.sunset'))).diff(moment(new Date()))).format('H:mm:ss');
            obj.set('sunsetCountdown', timeUntilSunset);
        }
    }.observes('item.sunset')
});