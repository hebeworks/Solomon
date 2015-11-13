import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    noMonthData: false,
    
    didInsertElement: function () {
        var _this = this;

        this.set('title', 'LCC Directorate Spending');
        this.set('subTitle', 'Monthly spend for Leeds City Council directorates');

        var dateQuery = hebeutils.Base64.encode(JSON.stringify({ comparison: '$lte', value:new Date("2015-03-01") }));
        
        this.loadData('date='+dateQuery).then(function (data) {
            _this.setMonths(data);
            _this.set('selectedMonth', data[0]);
        });
    },
    
    _catPercentageRemaining: 100,
    catPercentageRemaining: Ember.computed({
        get(){
            return this.get('_catPercentageRemaining');
        },
        set(key,val) {
            var newVal = 100 - val; // because the css wants the inverse of the percentage
            if(this.get('_catPercentageRemaining') != newVal) {
                this.set('_catPercentageRemaining',newVal);
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

            if(this.get('_totalPercentageRemaining') != newVal) {
                this.set('_totalPercentageRemaining',newVal);
            }
            
            return newVal;
        }
    }),

    loadData: function (query) {
        var hebeNodeAPI = this.get('hebeNodeAPI');
        return this.getData(hebeNodeAPI + '/council-spending?' + query);
    },

    setMonths: function (records) {
        var yearTotal = 0,
            mergeList = [
                {incorrect: 'Adults Social Care ', correct: 'Adult Social Care'}, 
                {incorrect: 'Environments and Housing', correct: 'Environment & Housing'}
            ];
        
        records.forEach(function(month){
            for (var prop in month) {
                var merge = _.find(mergeList, function(objectItem) {
                    return prop == objectItem.incorrect
                });
                
                if (merge != null) {
                    month[merge.correct] += month[prop];
                    delete month[prop];
                }
            }
            
            month.text = moment(new Date(month.date)).format("MMM YYYY");
            month.longText = moment(new Date(month.date)).format("MMMM YYYY");
            month.id = moment(new Date(month.date)).format("YYYY-MM-DD");
            yearTotal += month.total;
        });
        
        this.setProperties({
            yearTotal: yearTotal,
            months:records,
            selectedMonth:records[0]
        });
    },
    
    setDirectorates: function() {
        var months = this.get('months'),
            directorates = [],
            _this = this;

        months.forEach(function(month) {
            var cats = _this.setCatListFromMonth(month);
            
            cats.forEach(function(cat) {
                if (_.findWhere(directorates, cat) == null) {
                    directorates.push(cat);
                }
            });
        });
        
        var sorted = _.sortBy(directorates, function (cat) {return cat.text;});
        
        this.set('categories', sorted);
        this.set('selectedCat', sorted[0]);
    }.observes('months'),
    
    setCatListFromMonth: function (month) {
        // get the list of directorates from the currentMonth in case some months are named differently
        var currentSelectedCat = this.get('selectedCat'),
            currentSelectedID = (currentSelectedCat ? currentSelectedCat.id : null),
            currentSelectedIndex = 0,
            directorates = [],
            ignore = ['total', 'date', '_id', 'text', 'id', 'longText'],
            i = 0;
            
        for (var prop in month) {
            if (ignore.indexOf(prop) == -1) {
                directorates.push({ text: prop, id: prop });
                // directorates.push(prop);
            }
            // if this is named the same as the current selected cat
            // grab the index to select when we reset the cats
            if(currentSelectedID && prop == currentSelectedID) {
                currentSelectedIndex = i;
            }
            i ++;
        }
        
        return directorates;
    },

    onSelectedCatChange: function () {
        var selectedCat = this.get('selectedCat'),
            selectedMonth = this.get('selectedMonth');

        if(selectedMonth) {
            var catSpend = selectedMonth[this.get('selectedCat.id')];

            if (catSpend != null) {
                var monthSpend = selectedMonth["total"],
                    percentage = this.getPercentage(monthSpend, catSpend);

                this.set('catTotal', catSpend);
                this.set('catPercentageRemaining', percentage);
                this.set('noMonthData', false);
            } else {
                this.set('noMonthData', true);
            }
        }
    }.observes('selectedCat', 'selectedMonth'),

    getPercentage: function (totalVal, val) {
        return ((val / totalVal) * 100).toPrecisionDigits(1)
    },
    
    updateTotalSpend: function () {
        var month = this.get('selectedMonth'),
            percentage = this.getPercentage(this.get('yearTotal'),month.total);

        this.set('totalPercentageRemaining', percentage);
    }.observes('selectedMonth')
});