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
    barSelected: false,
    chosenBar: false,
    chosenBarValue: null,
    chosenBarLocation: null,
    
    onInsertElement: function () {
        this.addBarsToChart();
    }.on('didInsertElement'),
    
    addBarsToChart: function() {
        var _this = this;
        
        // console.log('addBarsToChart');
        var locations = [
            Ember.Object.create({
                location: 'Location 1',
                percentage: '45%'
            }),
            Ember.Object.create({
                location: 'Location 2',
                percentage: '50%'
            }),
            Ember.Object.create({
                location: 'Location 3',
                percentage: '55%'
            }),
            Ember.Object.create({
                location: 'Location 4',
                percentage: '60%'
            }),
            Ember.Object.create({
                location: 'Location 5',
                percentage: '65%'
            }),
            Ember.Object.create({
                location: 'Location 6',
                percentage: '70%'
            }),
            Ember.Object.create({
                location: 'Location 7',
                percentage: '75%'
            }),
            Ember.Object.create({
                location: 'Location 8',
                percentage: '80%'
            }),
            Ember.Object.create({
                location: 'Location 9',
                percentage: '85%'
            }),
            Ember.Object.create({
                location: 'Location 10',
                percentage: '90%'
            }),
            Ember.Object.create({
                location: 'Location 11',
                percentage: '95%'
            })
        ];
        
        _this.set('bars', locations);
        
        setTimeout(function () {
            _this.set('loaded', true);
        });
    },
    
    arrangeBars: function() {
        var _this = this;
        
        var numBars = _this.$('[spc-opc_bars]').find('[spc-opc_bar]').length,
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
    }.observes('loaded'),
    
    actions: {
        setSelectedBar: function(bar) {
            // alert(bar);
            if(!Ember.isEmpty(this.get('selectedBar'))) {
                this.set('selectedBar.isSelected',false);
            }
            bar.set('isSelected',true);
            this.set('selectedBar',bar);
        }
    }
});
