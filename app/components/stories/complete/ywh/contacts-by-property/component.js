/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Contact Volume by Property', // (Provide a story title)
        subTitle: 'Properties with the most contacts', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true,
    },
    items: [],
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywData'),
    onDMASReceivedAttrs: function () {
        this.get('ywData');
    }.on('didReceiveAttrs'),
    onYWData: function () {
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var items = this.get('appSettings').groupSortCount(ywData, 'propertyNumber', 5);
            this.set('items', items);
        }
    }.observes('ywData'),
});
