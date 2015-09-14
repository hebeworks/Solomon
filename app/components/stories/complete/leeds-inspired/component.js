/* global Ember, hebeutils, _, moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({

    tagName: 'div',
    loaded: false,
    didInsertElement: function () {
        this.set('title', 'Leeds Inspired');
        var obj = this;
        var fromDate = moment().add(-1, 'days').format('DD-MM-YYYY');
        var toDate = moment().add(5, 'days').format('DD-MM-YYYY');
        // var url = "http://localhost:8080/leedsinspired";
        // var url = "http://api.leedsinspired.co.uk/1.0/events.json?key=ssHoTt9L696e8F84IOH2o4n52n89nxX78pq1dLs4uOkc7&start_date=" + fromDate + "&end_date=" + toDate;
        // url = hebeutils.Base64.encode(url);
        var url = "http://hebenodeapi.azurewebsites.net/leedsinspired";
        this.getData(url)
        // this.getData('http://hebenodeapi.azurewebsites.net/apiproxy?url=' + url)
            .then(function (data) {
                var items = [];
                var events = data.objects;
                events = _.filter(events, function (event) {
                    return event.event_title.notNullOrEmpty() && event.event_date.notNullOrEmpty() && (event.image_thumbnail.notNullOrEmpty() || event.thumbnail.notNullOrEmpty());
                });
                events = _.sample(events, 5);
                events.forEach(function (item) {
                    var thumbnail = (item.image_thumbnail.notNullOrEmpty() ? item.image_thumbnail : item.thumbnail);
                    var event = {
                        id: item.event_id,
                        title: item.event_title,
                        thumbnail: thumbnail,
                        date: item.event_date,
                        place: item.place_title,
                        description: item.description
                    };
                    items.push(event);
                });
                obj.set('items', items);
                setTimeout(function () {
                    obj.set('loaded', true);
                    obj.setItemHeights();
                });
            });
    },

    setItemHeights: function () {
        this.$('.leeds-inspired-event').each(function () {
            var el = $(this);
            var description = el.find('.leeds-inspired-event__description');
            var totalHeight = el.height();
            var descriptionHeight = totalHeight 
                - (el.find('.leeds-inspired-event__heading').height() + 
                    el.find('.leeds-inspired-event__details').outerHeight() -10);
            try
            {
                var lineHeight = parseInt(description.css('line-height').replace('px'));
                var rows = Math.floor((descriptionHeight / lineHeight));
                description.css('height', (rows * lineHeight) + 'px');
                description.css('-webkit-line-clamp', rows);
            } catch(err)
            {
                description.css('height', descriptionHeight.toString() + 'px');                
            }
        });
    }
});
