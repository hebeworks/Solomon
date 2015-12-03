/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'WQ Contacts by Type', // (Provide a story title)
        subTitle: 'How are people contacting us?', // (Provide a story subtitle)
        viewOnly: true
    },
    items: [],
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onContactTypeReceivedAttrs: function () {
        this.get('ywData');
    }.on('didReceiveAttrs'),
    onYWData: function () {
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var items = this.get('appSettings').groupSortCount(ywData, 'contactMedia', 5);
            this.set('items', items);
        }
    }.observes('ywData'),
});
