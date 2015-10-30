import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // New variables 
    _directoratePercentageRemaining: 100,
    directoratePercentageRemaining: Ember.computed({
        get(){
            return this.get('_directoratePercentageRemaining');
        },
        set(key,val) {
            var newVal = 100 - val; // because the css wants the inverse of the percentage
            console.log('totalPercentageRemaining: '+newVal);
            if(this.get('_directoratePercentageRemaining') != newVal) {
                this.set('_directoratePercentageRemaining',newVal);
            }
            return newVal;
        }
    }),
    _totalPercentageRemaining: 100,
    totalPercentageRemaining: Ember.computed({
        get(){
            return this.get('_totalPercentageRemaining');
        },
        set(key,val) {
            var newVal = 100 - val; // because the css wants the inverse of the percentage
            console.log('directoratePercentageRemaining: '+newVal);
            if(this.get('_totalPercentageRemaining') != newVal) {
                this.set('_totalPercentageRemaining',newVal);
            }
            return newVal;
        }
    }),

    didInsertElement: function () {
        var _this = this;

        this.set('title', 'Council Spending');
        this.set('subTitle', 'Monthly spend data by directorate');

        // setTimeout(function () {
        //     _this.updateDirectorateSpend();
        // }, 1500);

        // setTimeout(function () {
        //     _this.updateTotalSpend();
        // }, 1750);

        // var query = { $and: [{ "date": { $gte: new Date("2014-04-01T01:00:00+0100") }, "date": { $lte: new Date("2015-03-01") }  }] }
        // var query = {
        //     date: {
        //         $gte: new Date("2014-04-01"),
        //         $lte: new Date("2014-07-01")
        //         // $lte: new Date("2015-03-01")
        //     }
        // };
        // query = hebeutils.Base64.encode(JSON.stringify(query));
        // this.loadData('query=' + query + '&sort=date&sortdirection=DESC').then(function (data) {
        var dateQuery = hebeutils.Base64.encode(JSON.stringify({ comparison: '$lte', value:new Date("2015-03-01") }));
        this.loadData('date='+dateQuery).then(function (data) {
            _this.setMonths(data);
            _this.set('selectedMonth', data[0]);
        });
    },

    loadData: function (query) {
        var hebeNodeAPI = this.get('hebeNodeAPI');
        return this.getData(hebeNodeAPI + '/council-spending?' + query);
    },

    setMonths: function (records) {
        // var months = _.map(records,function(record){
        //     return { text: record.date, id: record.date};
        // })
        var yearTotal = 0; 
        records.forEach(function(month){
            month.text = moment(new Date(month.date)).format("MMM YYYY");
            month.id = moment(new Date(month.date)).format("YYYY-MM-DD");
            yearTotal += month.total;
        });
        this.setProperties({
            yearTotal: yearTotal,
            months:records,
            selectedMonth:records[0]
        });
    },
    
    setCatListFromMonths: function () {
        // get the list of directorates from the first (only because we're passing "limit=1")
        var month = this.get('months.firstObject');
        var directorates = [];
        var ignore = ['total', 'date', '_id', 'text', 'id'];
        for (var prop in month) {
            if (ignore.indexOf(prop) == -1) {
                directorates.push({ text: prop, id: prop });
            }
        }
        this.set('categories', directorates);
        this.set('selectedCat', directorates[0]);
    }.observes('months'),


    onSelectedCatChange: function () {
        var selectedMonth = this.get('selectedMonth');
        if(selectedMonth) {
            var catSpend = selectedMonth[this.get('selectedCat.id')];
            var monthSpend = selectedMonth["total"];
    
            var percentage = this.getPercentage(monthSpend, catSpend);
            console.log('cat percentage: ' + percentage);
            this.set('catTotal', catSpend);
            this.set('catPercentageRemaining', percentage);
        }
    }.observes('selectedCat'),

    getPercentage: function (totalVal, val) {
        return ((val / totalVal) * 100).toPrecisionDigits(1)
    },
    
    // onSelectedDateChange: function () {
    //     var selectedDate = this.get('selectedDate');
    // }.observes('selectedDate'),


    updateTotalSpend: function () {
        var month = this.get('selectedMonth');
        var percentage = this.getPercentage(this.get('yearTotal'),month.total);
        console.log('month percentage: ' + percentage);
        this.set('totalPercentageRemaining', percentage);
    }.observes('selectedMonth')
});