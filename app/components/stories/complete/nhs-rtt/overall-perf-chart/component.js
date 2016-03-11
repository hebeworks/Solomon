/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        viewOnly: true,
        scroll: true, // (Should the story vertically scroll its content?)
        height: 2,
        width: 2,
        showLoading: true
    },

    bars: [],
    barSelected: false,
    chosenBar: false,
    chosenBarValue: null,
    chosenBarLocation: null,
    /*
    of the PART_2
        % < 18
    */

    loadData: function () {
        var _this = this;
        var regionID = this.get('appSettings.canvasSettings.nhsFilter.selectedRegion.id');
        var ccgID = this.get('appSettings.canvasSettings.nhsFilter.selectedCCG.id');
        var providerID = this.get('appSettings.canvasSettings.nhsFilter.selectedProvider.id');
        var month = this.get('appSettings.canvasSettings.nhsFilter.selectedMonth.id');
        var url = this.get('appSettings.hebeNodeAPI') + '/nhsrtt/incompleteperformance/?datekey=' + month + '&groupby=treatment';
        if (providerID) {
            url += '&providerid=' + providerID;
        } else if (ccgID) {
            url += '&ccgid=' + ccgID;
        } else {
            url += '&regionid=' + regionID;
        }
        this.set('loaded',false);
        this.getData(url)
            .then(function (data) {
                _this.set('data', data);
            });
    }.observes(
        'appSettings.canvasSettings.nhsFilter.selectedRegion',
        'appSettings.canvasSettings.nhsFilter.selectedCCG',
        'appSettings.canvasSettings.nhsFilter.selectedProvider',
        'appSettings.canvasSettings.nhsFilter.selectedMonth'
        ),


    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),

    addBarsToChart: function () {
        var _this = this;
        var data = this.get('data');
        var locations = [];
        // var avg = 0;
        for (var i = 0; i < data.length; i++) {
            var obj = Ember.Object.create({
                location: data[i].name,
                percentage: ((data[i].gt_00_to_18_weeks_sum / data[i].total_all_sum) * 100).toPrecisionDigits(1)
            });
            // avg += obj.percentage; 
            locations.push(obj);
        }
        
        // avg = avg / data.length;
        this.setProperties({
            "national": 92,
            // "avg": avg
        });

        locations = _.sortBy(locations, function (obj) {
            return obj.percentage;
        });
        
        // // console.log('addBarsToChart');
        // var locations = [
        //     Ember.Object.create({
        //         location: 'Location 1',
        //         percentage: '45%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 2',
        //         percentage: '50%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 3',
        //         percentage: '55%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 4',
        //         percentage: '60%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 5',
        //         percentage: '65%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 6',
        //         percentage: '70%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 7',
        //         percentage: '75%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 8',
        //         percentage: '80%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 9',
        //         percentage: '85%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 10',
        //         percentage: '90%'
        //     }),
        //     Ember.Object.create({
        //         location: 'Location 11',
        //         percentage: '95%'
        //     })
        // ];
        
        
        _this.set('bars', locations);
        _this.arrangeBars();

        setTimeout(function () {
            _this.set('loaded', true);
        });
    }.observes('data'),

    arrangeBars: function () {
        var _this = this;

        var numBars = _this.get('bars.length'), // $('[spc-opc_bars]').find('[spc-opc_bar]').length,
            chartHeight = _this.$('[spc-opc_bars]').outerHeight(),
            spacing = (chartHeight / numBars) / 2;
        spacing = (spacing < 4 ? 4 : spacing);
        // console.log('Number of bars: ' + numBars);
        // console.log('Chart height: ' + chartHeight);
        // console.log('Spacing: ' + spacing);
            
        _this.get('bars').forEach(function (bar) {
            bar.setProperties({
                'height': spacing,
                'margin-bottom': spacing,
                'spacing': spacing + 'px'
            });
        });
        
        // _this.$('[spc-opc_bar]').each(function() {
        //     $(this)
        //         .css('height', spacing)
        //         .css('margin-bottom', spacing);
        // });
    },

    actions: {
        setSelectedBar: function (bar) {
            // alert(bar);
            if (!Ember.isEmpty(this.get('selectedBar'))) {
                this.set('selectedBar.isSelected', false);
            }
            bar.set('isSelected', true);
            this.set('selectedBar', bar);
        }
    }
});
