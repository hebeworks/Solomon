/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'Top DMAs in Zone', // (Provide a story title)
        subTitle: 'Most contacted DMAs in this System', // (Provide a story subtitle)
        viewOnly: true
    },
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onDMASReceivedAttrs: function () {
        this.get('ywData');
    }.on('didReceiveAttrs'),
    onYWData: function () {
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var items = this.get('appSettings').groupSortCount(ywData, 'dma', 5);
            this.set('items', items);
        }
    }.observes('ywData'),
});
