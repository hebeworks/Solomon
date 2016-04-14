/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: 'How full is my bin?', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        showHeaderBorder: false,
        viewOnly: true,
        showLoading: true
    },
    
    fillPercentage: 0,
    fillPercentageRemaining: Ember.computed('fillPercentage', function fillPercentageRemaining() {
        const fillPercentage = this.get('fillPercentage');
        
        return 100 - fillPercentage;
    }),
    fillText: Ember.computed('fillPercentage', function fillText() {
        const fillPercentage = this.get('fillPercentage');
        
        if (fillPercentage >= 80) {
            return 'Getting full<br>Keep an eye on me';
        } else {
            return 'Plenty of room<br>Keep it coming';
        }
    }),
    fillColour: Ember.computed('fillPercentage', function fillColour() {
        const fillPercentage = this.get('fillPercentage');
        
        if (fillPercentage >= 80) {
            return 'orange';
        } else {
            return 'green';
        }
    }),
    recyclingTrend: null, // more, same, less
    // batteryStatus: null, // can't write this until we get the sensor
    // connectionStatus: null, // can't write this until we get the sensor
    previousBinDay: null,
    nextBinDay: null,
    currentDate: null,
    rotationAmount: null,
    
    onInsertElement: function() {
        const _this = this;
        
        setTimeout(function() {
            _this.set('fillPercentage', 35);
            _this.set('loaded', true);
            _this.set('rotationAmount', 157);
        });
    }.on('didInsertElement')
});
