/* global hebeutils, _, moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
	tagName: 'div',
	loaded: false,
	allMonthsLoaded: false,
	selectedMonth: '',
	months: [],
	loadedMonths: 0,
	didInsertElement: function () {
		this.set('title', 'House prices in Leeds');
		this.set('subTitle', 'Average house price in Leeds by month');
		this.getPast12Months();
	},

	chartData: null,
	tmpChartData: {
		detached: [],
		flat: [],
		semi: [],
		terraced: []
	},

	getPast12Months: function () {
		var obj = this;
		this.set('monthsToLoad', 13);
		for (var i = 1; i <= this.get('monthsToLoad'); i++) {
			var monthsToSubtract = i + 1; // seem to only have data starting 2 months back so start from there
			this.getMonthData(moment().add(-(monthsToSubtract), 'month').format('YYYY-MM'))
				.then(function (month) {
				if (month != null) {
					obj.get('months').push(month);
				}
					obj.set('loadedMonths', obj.get('loadedMonths') + 1);
			});
		}
	},

	finaliseChartData: function () {
		var obj = this;
		this.set('chartData', this.get('tmpChartData'));
		setTimeout(function () { obj.set('loaded', true); });
	}.observes('allMonthsLoaded'),

	monthLoaded: function () {
		if (this.get('loadedMonths') === this.get('monthsToLoad')) {
			this.set('allMonthsLoaded', true);
		}

		if (this.get('months') != null) {
			if (this.get('months').length > 0) {
				this.set('currentMonth', this.get('months')[0]);
			}
			if (this.get('months').length > 1) {
				this.set('previousMonth', this.get('months')[1]);
			}
		}
	}.observes('loadedMonths'),


	getMonthData: function (date) {
		//http://landregistry.data.gov.uk/data/hpi/region/england-and-wales/year/2014-02.json
		return this.getData('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/' + date + '.json')
			.then((data) => {
			var item = data.result.primaryTopic;
			if (item != null && item != "elda:missingEndpoint") {
				var resource = {
					annualChange: item.annualChange,
					averageDetached: item.averagePricesDetachedSASM,
					averageFlat: item.averagePricesFlatMaisonetteSASM,
					averageSA: item.averagePricesSA,
					averageSASM: item.averagePricesSASM,
					averageSemi: item.averagePricesSemiDetachedSASM,
					averageTerraced: item.averagePricesTerracedSASM,
					dataSet: item.dataSet,
					indices: item.indices,
					indicesSA: item.indicesSA,
					indicesSASM: item.indicesSASM,
					monthlyChange: item.monthlyChange
				};
			
				// append data to chart arrays
				var chartData = this.get('tmpChartData');
				var axisDate = date + '-01';
				chartData.detached.push({ date: axisDate, value: resource.averageDetached });
				chartData.flat.push({ date: axisDate, value: resource.averageFlat });
				chartData.semi.push({ date: axisDate, value: resource.averageSemi });
				chartData.terraced.push({ date: axisDate, value: resource.averageTerraced });

				return resource;
			} else {
				return null;
			}
		});
	},

	changeDetached: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageDetached') / this.get('previousMonth.averageDetached')) * 100), 2);
	}.property('currentMonth.averageDetached', 'previousMonth.averageDetached'),

	changeFlat: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageFlat') / this.get('previousMonth.averageFlat')) * 100), 2);
	}.property('currentMonth.averageFlat', 'previousMonth.averageFlat'),

	changeSemi: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageSemi') / this.get('previousMonth.averageSemi')) * 100), 2);
	}.property('currentMonth.averageSemi', 'previousMonth.averageSemi'),

	changeTerraced: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageTerraced') / this.get('previousMonth.averageTerraced')) * 100), 2);
	}.property('currentMonth.averageTerraced', 'previousMonth.averageTerraced')
});
