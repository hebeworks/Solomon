import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    didInsertElement: function () {
        var _this = this;

        this.set('title', 'Leeds City Council Spending');
        this.set('subTitle', 'Monthly spend for Leeds City Council');

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
            console.log('catPercentageRemaining: '+newVal);
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
            console.log('totalPercentageRemaining: '+newVal);
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
        var yearTotal = 0; 
        records.forEach(function(month){
            month.text = moment(new Date(month.date)).format("MMMM YYYY");
            month.id = moment(new Date(month.date)).format("YYYY-MM-DD");
            yearTotal += month.total;
        });
        this.setProperties({
            yearTotal: yearTotal,
            months:records,
            selectedMonth:records[0]
        });
    },
    
    setCatListFromMonth: function () {
        // get the list of directorates from the currentMonth in case some months are named differently
        var currentSelectedCat = this.get('selectedCat');
        var currentSelectedID = (currentSelectedCat ? currentSelectedCat.id : null);
        var currentSelectedIndex = 0;
        var month = this.get('selectedMonth');
        var directorates = [];
        var ignore = ['total', 'date', '_id', 'text', 'id'];
        var i = 0;
        for (var prop in month) {
            if (ignore.indexOf(prop) == -1) {
                directorates.push({ text: prop, id: prop });
            }
            // if this is named the same as the current selected cat
            // grab the index to select when we reset the cats
            if(currentSelectedID && prop == currentSelectedID) {
                currentSelectedIndex = i;
            }
            i ++;
        }
        this.set('categories', directorates);
        this.set('selectedCat', directorates[currentSelectedIndex]);
    }.observes('selectedMonth'),

    onSelectedCatChange: function () {
        var selectedMonth = this.get('selectedMonth');
        if(selectedMonth) {
            var catSpend = selectedMonth[this.get('selectedCat.id')];
            var monthSpend = selectedMonth["total"];
    
            var percentage = this.getPercentage(monthSpend, catSpend);
            // console.log('cat percentage: ' + percentage);
            this.set('catTotal', catSpend);
            this.set('catPercentageRemaining', percentage);
        }
    }.observes('selectedCat'),

    getPercentage: function (totalVal, val) {
        return ((val / totalVal) * 100).toPrecisionDigits(1)
    },
    
    updateTotalSpend: function () {
        var month = this.get('selectedMonth');
        var percentage = this.getPercentage(this.get('yearTotal'),month.total);
        // console.log('month percentage: ' + percentage);
        this.set('totalPercentageRemaining', percentage);
    }.observes('selectedMonth')
});