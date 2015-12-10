/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    storyConfig: {
        title: 'WQ Contacts Most Active DMAs', // (Provide a story title)
        subTitle: 'Which DMAs produce the most contacts?', // (Provide a story subtitle)
        viewOnly: true,
        scroll: false
    },
    
    ywData: Ember.computed.alias('appSettings.canvasSettings.ywFilter.data'),
    
    onDMASReceivedAttrs: function () {
        this.onYWData();
    }.on('didReceiveAttrs'),
    
    onYWData: function () {
        var ywData = this.get('ywData');
        if (!Ember.isEmpty(ywData)) {
            var items = this.get('appSettings').groupSortCount(ywData, 'dma', 5);
            this.set('items', items);
        }
    }.observes('ywData'),
    
});
