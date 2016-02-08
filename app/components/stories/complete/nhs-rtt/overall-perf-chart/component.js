/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        viewOnly: true,
        scroll: true, // (Should the story vertically scroll its content?)
        height: 3
    },
    
    bars: [],
    
    onInsertElement: function () {
        this.addBarsToChart();
    }.on('didInsertElement'),
    
    addBarsToChart: function() {
        var _this = this;
        
        // console.log('addBarsToChart');
        var locations = [
            {
                location: 'Location 1',
                percentage: '45%'
            },
            {
                location: 'Location 2',
                percentage: '50%'
            },
            {
                location: 'Location 3',
                percentage: '55%'
            },
            {
                location: 'Location 4',
                percentage: '60%'
            },
            {
                location: 'Location 5',
                percentage: '65%'
            },
            {
                location: 'Location 6',
                percentage: '70%'
            },
            {
                location: 'Location 7',
                percentage: '75%'
            },
            {
                location: 'Location 8',
                percentage: '80%'
            },
            {
                location: 'Location 9',
                percentage: '85%'
            },
            {
                location: 'Location 10',
                percentage: '90%'
            },
            {
                location: 'Location 11',
                percentage: '95%'
            }
        ];
        
        _this.set('bars', locations);
        
        setTimeout(function () {
            _this.set('loaded', true);
        });
    },
    
    arrangeBars: function() {
        var _this = this;
        
        var numBars = _this.$('[spc-opc_bars]').children('[spc-opc_bar]').length,
            chartHeight = _this.$('[spc-opc_bars]').outerHeight(),
            spacing = (chartHeight / numBars) / 2;
            
        // console.log('Number of bars: ' + numBars);
        // console.log('Chart height: ' + chartHeight);
        // console.log('Spacing: ' + spacing);
            
        _this.$('[spc-opc_bar]').each(function() {
            $(this)
                .css('height', spacing)
                .css('margin-bottom', spacing);
        });
    }.observes('loaded')
});
