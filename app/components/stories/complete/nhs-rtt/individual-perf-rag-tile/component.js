/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
    storyConfig: {
        title: '',
        subTitle: '',
        width: '1',
        height: '1',
        scroll: false,
        viewOnly: true
    },

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
            return treatment.name;
        }
        return '';
    }.property('storyModel.config.@each.value'),


    loadData: function () {
        var _this = this;
        /*
            treatmentID
                topCCG  bottomCCG
                
                for this treatment
                    load all CCGs   
        */
        var treatmentID = this.get('treatmentID');
        if (!Ember.isEmpty(treatmentID)) {
            this.getData(this.get('appSettings.hebeNodeAPI') + '/nhsrtt/treatments/' + treatmentID)
                .then(function (treatmentData) {
                    var ccgs = treatmentData[0].ccgs;
                    var weeks18 = 0;
                    var totals = 0;
                    for (var i = 0; i < ccgs.length; i++) {
                        var ccg = ccgs[i];
                        weeks18 += ccg.gt_00_to_18_weeks_sum;
                        totals += ccg.total;
                        var percentage = ((ccg.gt_00_to_18_weeks_sum / ccg.total) * 100);
                        // percentage = Math.round( percentage * 10 ) / 10;
                        ccg.percentage = percentage.toPrecisionDigits(1);
                    }
                    var totalPercentage = (weeks18 / totals) * 100;
                    _this.set('value',totalPercentage.toPrecisionDigits(1));
                    
                    var sorted = _.sortBy(ccgs,function(ccg) {
                        return ccg.percentage;
                    });
                    _this.set('lowValue',sorted.get('firstObject').percentage);
                    _this.set('topValue',sorted.get('lastObject').percentage);
                });
        }
    }.observes('treatmentID', 'appSettings.canvasSettings.nhsFilter.selectedRegion'),


    value: 95.6,
    topValue: 97.43,
    lowValue: 87.2,
    valueHasDeviated: true,
    topHasChanged: false,
    lowHasChanged: false,
    topColour: 'black',
    lowColour: 'black',

    onInsertElement: function () {
        var _this = this;
        setTimeout(function () {
            _this.set('loaded', true);
        });
    }.on('didInsertElement'),

    updateTileApperance: function () {
        var _this = this;

        if (_this.valueHasDeviated == true) {
            // console.log('valueHasDeviated');
            _this.set('storyConfig.color', 'red');
            _this.set('topColour', 'white');
            _this.set('lowColour', 'white');
            _this.set('storyConfig.customProperties', 'has-deviated');
        }

        if (_this.topHasChanged == true) {
            // console.log('topHasChanged');
            _this.set('topColour', 'blue');
        }

        if (_this.lowHasChanged == true) {
            // console.log('lowHasChanged');
            _this.set('lowColour', 'red');
        }
    }.observes('loaded')
});
