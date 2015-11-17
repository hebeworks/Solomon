/* global ) */
import Ember from 'ember';
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
	storyConfig: {
		title: 'LCC Spending',
		subTitle: '13 months',
		scroll: false
	},
	
	storyModel: null,
	chartType: 'line',
	data: [],

	loadData: function () {
		var obj = this;
		// var url = 'http://localhost:8080/councilspending?date=eyJjb21wYXJpc29uIjoiJGx0IiwidmFsdWUiOiIyMDE1LTEwLTIxIn0='; //limit=13&sort=date';
		/*
			to query by a field base 64 encode the json stringified query object with comparison & value
				var dateQuery = hebeutils.Base64.encode(JSON.stringify({ comparison: "$gt", value: "2015-10-21" }));
				var url = http://localhost:8080/councilspending?date=' + dateQuery
			to limit
				url += '&limit=13'
			to sort
				url += '&sortfield=date'
				url += '&sortdirection=asc' OR '&sortdirection=desc' 
		*/
		var hebeNodeAPI = this.get('hebeNodeAPI');
		var query = hebeutils.Base64.encode(JSON.stringify({ date: { $gt: new Date("2013-04-01") } }));
		var url = hebeNodeAPI + '/council-spending?query=' + query;
		this.getData(url)
			.then(
				function (data) {
					obj.set('data', data);
					var to = moment(new Date(data[0].date)).format('MMM YYYY');
					var fromDate = moment(new Date(_.last(data).date)).format('MMM YYYY'); 
					var subTitle = 'From ' +  fromDate + ' to ' + to;
					obj.set('subTitle',subTitle);
				},
				function (err) {
					// alert(err);
				}
			)
	}.on('didInsertElement'),

	chartData: Ember.computed('data', {
		get() {
			var data = this.get('data');
			var labels = _.map(data, function (item) {
				// return moment(new Date(item.date["$date"])).format("MM-YY");
				return moment(new Date(item.date)).format("MM-YY");
			});
			var series = [];
			data.forEach(function (item) {
				var i = 0;
				for (var prop in item) {
					if (series[i] == null) {
						series[i] = [];
					}
					if (prop != "date") {
						series[i].push(item[prop]);
						i++;
					}
				}
			});
			// debugger;
			return {
				labels: labels,
				series: series
			}
		}
	}),

	chartOptions: Ember.computed(function() {
		var _this = this;
		var options = {
			low: 0,
			showArea: false,
			showPoint: true,
			fullWidth: true,
			lineSmooth: Chartist.Interpolation.simple({
				divisor: 20
			}),
			axisX: {
				labelInterpolationFnc: function (value, index) {
					return index % 2 === 0 ? value : null;
				}
			},
			axisY: {
				// Lets offset the chart a bit from the labels
				offset: 30,
				// The label interpolation function enables you to modify the values
				// used for the labels on each axis. Here we are converting the
				// values into million pound.
				labelInterpolationFnc: function (value) {
					var val = _this.formatLargeNumbers(value);
					return val;
				}
			}
		};
		return options;
	}),
	
	formatLargeNumbers: function (rep) {
		rep = rep+''; // coerce to string
		if (rep < 1000) {
			return rep; // return the same number
		}
		if (rep < 10000) { // place a comma between
			return rep.charAt(0) + ',' + rep.substring(1);
		}
		if(rep < 1000000) { // display thousands with k
			// divide and format
			return (rep/1000).toFixed(rep % 1000 != 0)+'k';
		}
		return (rep/1000000).toFixed((rep % 1000000 != 0 ? 2 : 0))+'m';
	}
});
