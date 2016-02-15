/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        color: 'blue', // (Set the story colour)
        // width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '1', // (Set the height of the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true,
        showLoading: true
    },
    
    // loaded: false, // (Tell other elements that this story has loaded)
    //
    
    // Add your story-specific code here
    data: null,
    percentage: 0,
    
    onInsertElement: function () {
        this.loadData();
        // var _this = this;
        // setTimeout(function() {
        //     _this.set('loaded', true);
        // });
    }.on('didInsertElement'),

nhsFilter: Ember.computed.alias('appSettings.canvasSettings.nhsFilter'),

    loadData: function () {
        var _this = this;
        var month = this.get('nhsFilter.selectedMonth');
        var regionID = this.get('nhsFilter.selectedRegion.id');

        // var query = 'providerid=RQM&datekey=20150930';
        var query = 'regionid='+regionID+'&datekey=' + month.id + '&pathways=true';
        var monthString = moment(month.id).format('MMM YYYY');
        _this.set('month', monthString);

        this.getData(this.get('appSettings.hebeNodeAPI') + '/nhsrtt/waitinglist?' + query)
            .then(function(data) {
                    var items = data; // the JSON returned from the API call is available here
                    var part2 = _.find(items,function(obj){
                        return obj._id === 'PART_2';
                    });
                    _this.set('items',items); // set properties on the Ember component to make them available in the template
                    var percentage = ((part2.gt_00_to_18_weeks_sum / part2.total_all_sum) *100).toPrecisionDigits(1);
                    _this.set('percentage', percentage);
                    setTimeout(() => { _this.set('loaded', true); });
                },
                function(err){ console.log(err); }
            )
    }.observes('nhsFilter.selectedMonth','nhsFilter.selectedRegion'),
    
    // setValues: function() {
    //     this.set('percentage', 92.5);
    // }.observes('loaded')
});
