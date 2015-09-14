/* global hebeutils, _, moment */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
  tagName: 'div',
  loaded: false,
  didInsertElement: function () {
    this.set('title', 'Leeds Footfall Trends');
    this.set('subTitle', 'Weekly footfall stats for Leeds City Centre');
    this.loadAPIData();
  },

  loadAPIData: function() {
    var obj = this;
    var url = 'http://api.datapress.io/api/3/action/datastore_search?resource_id=21b55017-3799-4a36-9163-4284dd25f288&limit=1';
    this.getData(url)
    .then(
      function(tmpItem){
        // console.log('weekly-footfall > getData > success');
        var item = tmpItem.result.records[0];
        item.weekStarts = moment(item.weekStarts).format('ddd, Do MMMM YYYY');
        item.weekEnds = moment(item.weekEnds).format('ddd, Do MMMM YYYY');
        item.previousWeekComparison = parseInt(item.previousWeekComparison * 100).toPrecisionDigits(2);
        item.sameWeekPreviousYearComparison = parseInt(item.sameWeekPreviousYearComparison * 100).toPrecisionDigits(2);
        item.sameWeekPreviousYear2Comparison = parseInt(item.sameWeekPreviousYear2Comparison * 100).toPrecisionDigits(2);
        item.weeklyAverageComparison = parseInt(item.weeklyAverageComparison * 100).toPrecisionDigits(2);
        if (item.previousWeekComparison < 0) {
          item.previousWeekComparisonIndicator = '-negative';
          item.previousWeekComparisonArrow = '-down'
        } else {
          item.previousWeekComparisonIndicator = '-positive';
          item.previousWeekComparisonArrow = '-up'
        }
        if (item.sameWeekPreviousYearComparison < 0) {
          item.sameWeekPreviousYearComparisonIndicator = '-negative';
          item.sameWeekPreviousYearComparisonArrow = '-down'
        } else {
          item.sameWeekPreviousYearComparisonIndicator = '-positive';
          item.sameWeekPreviousYearComparisonArrow = '-up'
        }
        if (item.sameWeekPreviousYear2Comparison < 0) {
          item.sameWeekPreviousYear2ComparisonIndicator = '-negative';
          item.sameWeekPreviousYear2ComparisonArrow = '-down'
        } else {
          item.sameWeekPreviousYear2ComparisonIndicator = '-positive';
          item.sameWeekPreviousYear2ComparisonArrow = '-up'
        }
        if (item.weeklyAverageComparison < 0) {
          item.weeklyAverageComparisonIndicator = '-negative';
          item.weeklyAverageComparisonArrow = '-down'
        } else {
          item.weeklyAverageComparisonIndicator = '-positive';
          item.weeklyAverageComparisonArrow = '-up'
        }
        obj.set('item', item);
        setTimeout(() => {
          obj.set('loaded', true);
        });
      },

      function(error) {
        console.log('weekly-footfall > getData > error: ' + error);
      },

      function(){

      }
      )
  }

});