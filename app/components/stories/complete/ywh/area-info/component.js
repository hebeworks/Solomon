/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?),
        viewOnly: true,
        color: 'dark-blue',
        height: 1
    },
    
    canvasSettings: Ember.computed.alias('appSettings.canvasSettings'),
    zoneTitle: '',
    datePeriod: '',
    
    onInsertElement: function () {
        this.get('appSettings.canvasSettings');
        this.setValues();
    }.on('didInsertElement'),
    
    setValues: function() {
        var canvasSettings = this.get('appSettings.canvasSettings');
        
        if (!Ember.isEmpty(canvasSettings)) {
            var dateString = 'from ' + moment(canvasSettings.startDate).format('Do MMM YY') + ' to ' + moment(canvasSettings.endDate).format('Do MMM YY')
            this.set('datePeriod', dateString);
            
            var selectedZone = canvasSettings.selectedZone;
            if (!Ember.isEmpty(selectedZone)) {
                this.set('zoneTitle', selectedZone.text.toLowerCase());
            }
        }
    }.observes('canvasSettings.ywData')
});
