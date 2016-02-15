/* global Ember, hebeutils, moment, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    initialConfig: {
        title: '',
        subTitle: '',
        width: '1',
        height: '1',
        scroll: false,
        viewOnly: true,
        showLoading: true
    },

    value: null,
    topValue: null,
    lowValue: null,
    topColour: 'black',
    lowColour: 'black',

    editableFields: [
        {
            name: 'treatment_type',
            type: 'select',
            contentPath: 'appSettings.canvasSettings.nhsFilter.treatments',
            value: '',
            placeholder: 'Treatment Type'
        }
    ],

    treatmentID: null,
    treatmentName: function () {
        var treatmentID = this.fetchEditableFieldValue('treatment_type');
        this.set('treatmentID', treatmentID);
        if (!Ember.isEmpty(treatmentID)) {
            var treatments = this.get('appSettings.canvasSettings.nhsFilter.treatments');
            var treatment = _.find(treatments, function (obj) {
                return obj._id == treatmentID;
            });
            if(!Ember.isEmpty(treatment) && !Ember.isEmpty(treatment.name)) {
                return treatment.name;
            }
            return '';
        }
        return '';
    }.property('storyModel.config.@each.value'),

    loadData: function () {
        var _this = this;
        var ragLevels = {
          red: 92  
        };
        var treatmentID = this.get('treatmentID');
        var regionID = this.get('appSettings.canvasSettings.nhsFilter.selectedRegion.id');
        var currentDate = this.get('appSettings.canvasSettings.nhsFilter.selectedMonth.id');
        var previousDate = moment(currentDate, "YYYYMMDD").subtract('months', 1);
        var days = previousDate.daysInMonth();
        previousDate = previousDate.format('YYYYMM') + days;
        if (!Ember.isEmpty(treatmentID)) {
            _this.set('loaded', false);
            var url = this.get('appSettings.hebeNodeAPI') + '/nhsrtt/performance-by-treatments?'
                + 'treatmentid=' + treatmentID
                + '&regionid=' + regionID
                + '&currentdate=' + currentDate
                + '&previousdate=' + previousDate;
            // this.getData(this.get('appSettings.hebeNodeAPI') + '/nhsrtt/treatments/' + treatmentID)
            this.getData(url)
                .then(function (data) {
                    var current = processMonth(data[currentDate]);
                    var previous = processMonth(data[previousDate]);

                    var totalPercentage = current.totalPercentage.toPrecisionDigits(1);
                    var currentLow = current.data[0].percentage;
                    var currentHigh = current.data[current.data.length - 1].percentage;
                    var previousLow = previous.data[0].percentage;
                    var previousHigh = previous.data[current.data.length - 1].percentage;

                    _this.set('value', totalPercentage);
                    _this.set('lowValue', currentLow);
                    _this.set('topValue', currentHigh);
                    console.log(current.totalPercentage + ' - ' + previous.totalPercentage);
                    
                    if(current.totalPercentage < ragLevels.red) {
                        _this.set('storyConfig.color', 'red');
                        _this.set('topColour', 'white');
                        _this.set('lowColour', 'white');
                        _this.set('storyConfig.customProperties', 'has-deviated');
                    } else {
                        _this.set('storyConfig.color', 'white');
                        _this.set('topColour', 'black');
                        _this.set('lowColour', 'black');
                        _this.set('storyConfig.customProperties', '');
                    }

                    _this.set('topBorder','');
                    _this.set('lowBorder','');
                    _this.set('topPadding','');
                    _this.set('lowPadding','');

                    if(currentHigh < previousHigh) {
                        _this.setProperties({
                            'topColour': 'red', 
                            'topBorder': 'top right bottom left solid light',
                            'topPadding': 'all-none'
                        }); 
                    } else if (currentHigh > previousHigh) {
                        _this.set('topColour', 'blue');    
                    }

                    if(currentLow < previousLow) {
                        _this.setProperties({
                            'lowColour': 'red', 
                            'lowBorder': 'top right bottom left solid light',
                            'lowPadding': 'all-none'
                        });       
                    } else if (currentLow > previousLow) {
                        _this.set('lowColour', 'blue');       
                    }

                    setTimeout(function () {
                        _this.set('loaded', true);
                    });
                });
        }

        function processMonth(treatmentData) {
            var ccgs = treatmentData; //treatmentData[0].ccgs;
            var weeks18 = 0;
            var totals = 0;
            for (var i = 0; i < ccgs.length; i++) {
                var ccg = ccgs[i];
                weeks18 += ccg.gt_00_to_18_weeks_sum;
                totals += ccg.total_all_sum; // ccg.total;
                var percentage = ((ccg.gt_00_to_18_weeks_sum / ccg.total_all_sum) * 100);
                // percentage = Math.round( percentage * 10 ) / 10;
                ccg.percentage = percentage.toPrecisionDigits(1);
            }
            var totalPercentage = (weeks18 / totals) * 100;

            var sorted = _.sortBy(ccgs, function (ccg) {
                return ccg.percentage;
            });

            return { totalPercentage: totalPercentage, data: sorted };
        }
    }.observes('treatmentID', 'appSettings.canvasSettings.nhsFilter.selectedRegion','appSettings.canvasSettings.nhsFilter.selectedMonth'),

});
