import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    // New variables 
    directoratePercentageRemaining: 100,
    totalPercentageRemaining: 100,

    didInsertElement: function () {
        var _this = this;

        this.set('title', 'Council Spending');
        this.set('subTitle', 'Monthly spend data by directorate');

        setTimeout(function () {
            _this.updateDirectorateSpend();
        }, 1500);

        setTimeout(function () {
            _this.updateTotalSpend();
        }, 1750);

        this.loadData('limit=1').then(function (data) {
            // get the list of directorates from the first (only because we're passing "limit=1")
            var directorates = [];
            var ignore = ['total', 'date', '_id'];
            for (var prop in data[0]) {
                if (ignore.indexOf(prop) == -1) {
                    directorates.push({ text: prop, id: prop });
                    // directorates.push({ key: prop, val: data[0][prop] });
                    // directorates.push(prop);
                }
            }
            _this.set('categories', directorates);
            _this.set('selectedCat', directorates[0]);
        });
    },

    loadData: function (query) {
        var hebeNodeAPI = this.get('hebeNodeAPI');
        return this.getData(hebeNodeAPI + '/council-spending?' + query);
    },

    onSelectedCatChange: function () {
        var selectedCatID = this.get('selectedCat.id');
        
    }.observes('selectedCat'),

    onSelectedDateChange: function () {
        var selectedDate = this.get('selectedDate');
        this.loadData('')
    }.observes('selectedDate'),

    updateDirectorateSpend: function () {
        this.set('directoratePercentageRemaining', 37);
    },

    updateTotalSpend: function () {
        this.set('totalPercentageRemaining', 53);
    }
});