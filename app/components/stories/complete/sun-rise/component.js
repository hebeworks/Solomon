/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function () {
        this.set('title', '');
        this.set('subTitle', '');
        this.loadAPIData('today');
    },

    loadAPIData: function (sunriseSelect) {
        var obj = this;
        var url = 'http://api.sunrise-sunset.org/json?lat=53.8007554&lng=-1.5490774&date=' + sunriseSelect + '&formatted=0';
        this.getData(url)
            .then(
                function (tmpItem) {
                    // console.log('sun-rise > getData > success');
                    var id = hebeutils.guid();
                    var item = {
                        id: id,
                        sunrise: tmpItem.results.sunrise,
                    };
                    if (new Date() > new Date(item.sunrise)) {
                        obj.loadAPIData('tomorrow');
                        // console.log('sunrise has passed, getting tomorrow');
                    } else {
                        var millisecondsUntilNextRefresh = moment(new Date(item.sunrise)).diff(moment(new Date()));
                        setTimeout(function () {
                            obj.loadAPIData('today');
                        }, millisecondsUntilNextRefresh);
                        item.sunriseFormatted = moment(new Date(item.sunrise)).locale('en').format('hh:mm A');
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
            var timeUntilSunrise = moment.duration(moment(new Date(obj.get('item.sunrise'))).diff(moment(new Date()))).humanize();
            obj.set('sunriseCountdown', timeUntilSunrise);
        }
    }.observes('item.sunrise')
});