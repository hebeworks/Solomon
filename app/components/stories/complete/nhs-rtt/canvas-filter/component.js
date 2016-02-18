/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true,
        width: 3
    },
	nhsFilter: Ember.computed.alias('appSettings.canvasSettings.nhsFilter'),
    onInit: function() {
        this.get('nhsFilter.regions');
    }.on('init')
});
