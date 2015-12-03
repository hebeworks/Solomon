/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'Contact Volume by Type', // (Provide a story title)
        subTitle: 'Most common contact media types', // (Provide a story subtitle)
    },
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    items: [],
    
    onMediaReceivedAttrs: function () {
        this.get('appSettings.canvasSettings.ywData');
        this.get('ywData');
        this.get('items');
    }.on('didReceiveAttrs'),
    

    loadData: function () {
        var _this = this;
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            this.getData(this.get('appSettings.hebeNodeAPI') + '/yw-contact-data?distinctfield=contactMedia')
                .then(function (mediaTypes) {
                    mediaTypes.forEach(function (mediaType) {
                        _this.getData('http://hebenodeapi-testing.azurewebsites.net/yw-contact-data?query='
                            + _this.get('appSettings')
                                .encodeQuery({ contactMedia: mediaType })
                                + '&limit=-1&count=true')
                            .then(function (typeData) {
                                console.log(mediaType + ' = ' + typeData.count);
                                var items = _this.get('items');
                                var obj = Ember.Object.create({
                                    index: items.length + 1,
                                    value: items,
                                    count: typeData.count
                                });
                                items.push(obj);
                                _this.set('items', items);
                            });

                    });

                });
        }
    }.observes('ywData')
});
