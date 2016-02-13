/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)        
        color: 'blue', // (Set the story colour)
        viewOnly: true
    },
    
    regions: Ember.computed.alias('appSettings.canvasSettings.nhsFilter.regions'),
    selectedRegionObject: Ember.computed.alias('appSettings.canvasSettings.nhsFilter.selectedRegion'),
    selectedRegionID: Ember.computed.alias('appSettings.canvasSettings.nhsFilter.selectedRegion._id'),
    
    loaded: false, // (Tell other elements that this story has loaded)
    
    onInsertElement: function () {        
        var _this = this;
        setTimeout(function() {
            _this.set('loaded', true);
        });
    }.on('didInsertElement'),
    
    updateRegion: function() {
        var _this = this,
            regions = this.get('regions'),
            selectedRegionObject = this.get('selectedRegionObject');
        
        // London
        _this.$('#Fill-9').on('click', function() {
            var selectedRegion = _.find(regions, function(obj) {
                return obj._id == 'Y56';
            });
            
            _this.set('selectedRegionObject', selectedRegion);
        });
        
        // South
        _this.$('#Fill-4').on('click', function() {
            var selectedRegion = _.find(regions, function(obj) {
                return obj._id == 'Y57';
            });
            
            _this.set('selectedRegionObject', selectedRegion);
        });
        
        // North
        _this.$('#Fill-1').on('click', function() {
            var selectedRegion = _.find(regions, function(obj) {
                return obj._id == 'Y54';
            });
            
            _this.set('selectedRegionObject', selectedRegion);
        });
        
        // Midlands
        _this.$('#Fill-6').on('click', function() {
            var selectedRegion = _.find(regions, function(obj) {
                return obj._id == 'Y55';
            });
            
            _this.set('selectedRegionObject', selectedRegion);
        });
    }.observes('loaded')
});
