/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'Top DMAs in Zone', // (Provide a story title)
        subTitle: 'Most contacted DMAs in this System', // (Provide a story subtitle)
    },
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onDMASReceivedAttrs: function () {
        this.get('ywData');
    }.on('didReceiveAttrs'),
    onYWData: function () {
        var ywData = this.get('ywData');
        debugger;
        if (!Ember.isEmpty(ywData)) {
            var items = this.groupSortCount(ywData, 'zoneRef');
        }
    }.observes('ywData'),

    groupSortCount: function (arr, prop) {
        var grouped = _.groupBy(arr, function (obj) {
            return obj[prop];
        });
        var items = [];
        for (var key in grouped) {
            if (grouped.hasOwnProperty(key)) {
                var element = grouped[key];
                var count =
                    items.push({
                        groupKey: key,
                        count: element.length,
                        items: element
                    });
            }
        }
        items.sort(function (obj) { return obj.count; }).reverse();
        return items;
    }
});
