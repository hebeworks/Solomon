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
        color: 'yw-medium-blue',
        height: 1
    },
    
    ywFilter: Ember.computed.alias('appSettings.canvasSettings.ywFilter'),
    zoneTitle: '',
    datePeriod: '',
    
    onInsertElement: function () {
        this.get('ywFilter');
        this.setValues();
    }.on('didInsertElement'),
    
    setValues: function() {
        var ywFilter = this.get('ywFilter');
        
        if (!Ember.isEmpty(ywFilter)) {
            var dateString = 'from ' + moment(ywFilter.startDate).format('Do MMM YY') + ' to ' + moment(ywFilter.endDate).format('Do MMM YY');
            this.set('datePeriod', dateString);
            
            var selectedZone = ywFilter.selectedZone;
            if (!Ember.isEmpty(selectedZone)) {
                this.set('zoneTitle', selectedZone.text.toLowerCase());
            }
        }
    }.observes('ywFilter')
});
