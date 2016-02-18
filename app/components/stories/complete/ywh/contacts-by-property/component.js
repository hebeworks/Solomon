/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    initialConfig: {
        title: 'WQ Contacts Most Active Properties',
        subTitle: 'Which properties contact us the most?',
        scroll: false,
        viewOnly: true,
    },
    items: [],
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    onDMASReceivedAttrs: function () {
        this.onYWData();
    }.on('didReceiveAttrs'),
    onYWData: function () {
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var items = this.get('appSettings').groupSortCount(ywData, 'propertyNumber', 5);
            this.set('items', items);
        }
    }.observes('ywData'),
});
