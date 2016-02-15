import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    initialConfig: {
        title:'Live Leeds River Level',
        subTitle: 'Water flowing under Crown Point Bridge',
        color: 'dark-blue',
        dataSourceUrl: 'http://environment.data.gov.uk/flood-monitoring/doc/reference',
        feedbackEmail: 'simon@hebeworks.com',
        description: 'This Story uses Environment Agency flood and river level data from the real-time data API (Beta)',
        license: 'Open Government License',
        author: 'Simon Zimmerman'
    },
    
    selectedStation: null,
    didInsertElement: function () {
        var obj = this;
        this.getData('http://environment.data.gov.uk/flood-monitoring/id/stations/L1707')
            .then(function (station) {
                var item = station.items;
                var latestReading = item.measures.latestReading;
                var maxOnRecord = item.stageScale.maxOnRecord;
                var minOnRecord = item.stageScale.minOnRecord;
                var highestRecent = item.stageScale.highestRecent;
                var typicalRangeHigh = item.stageScale.typicalRangeHigh;
                var typicalRangeLow = item.stageScale.typicalRangeLow;
                obj.setProperties({
                    // latestReading: latestReading,
                    maxOnRecord: maxOnRecord,
                    minOnRecord: minOnRecord,
                    highestRecent: highestRecent,
                    // typicalRangeHigh: typicalRangeHigh,
                    typicalRangeLow: typicalRangeLow,
                });
                // check for changes to the api data every fifteen minutes
                setTimeout(obj.fetchData, 900000);
                setTimeout(function () {
                    obj.set('loaded', true);
                });
                setTimeout(function() {
                    obj.setProperties({
                        latestReading:latestReading,
                        typicalRangeHigh:typicalRangeHigh
                    });
                }, 500);
            });
    }.observes('selectedStation'),

    setHeights: function () {
        var obj = this;
        var heightLowest = ((this.get("minOnRecord.value") / this.get("maxOnRecord.value")) * 100);
        var heightTypicalHigh = (((this.get("typicalRangeHigh") / this.get("maxOnRecord.value")) * 100) - heightLowest);
        var heightHighestRecent = (((this.get("highestRecent.value") / this.get("maxOnRecord.value")) * 100) - (heightLowest + heightTypicalHigh));
        var heightMax = (100 - (heightLowest + heightTypicalHigh + heightHighestRecent));
        obj.setProperties({
            heightLowest: heightLowest,
            heightTypicalHigh: heightTypicalHigh,
            heightHighestRecent: heightHighestRecent,
            heightMax: heightMax,
        });
        var heightLowestString = heightLowest.toString() + '%';
        this.$(".river-levels-columnChart-container-inner--lowestLevel").height(heightLowestString);
        var heightTypicalHighString = heightTypicalHigh.toString() + '%';
        this.$(".river-levels-columnChart-container-inner--typicalHighLevel").height(heightTypicalHighString);
        var heightHighestRecentString = heightHighestRecent.toString() + '%';
        this.$(".river-levels-columnChart-container-inner--highestLevelRecent").height(heightHighestRecentString);
        var heightMaxString = heightMax.toString() + '%';
        this.$(".river-levels-columnChart-container-inner--maxLevel").height(heightMaxString);
    }.observes("minOnRecord.value", "typicalRangeHigh", "maxOnRecord.value", "highestRecent"),

    setFloodWarning: function () {
        var obj = this;
        var currentLevel = this.get("latestReading.value");
        var typicalRangeHigh = this.get("typicalRangeHigh");
        if (currentLevel > typicalRangeHigh) {
            this.$(".info-label").css({"background-color": "#d0021b"});
            this.$(".info-label").text("Risk of flooding");
        }
        else {
            this.$(".info-label").css({"background-color": "#468ee5"});
            this.$(".info-label").text("No risk of flooding");
        }
    }.observes("latestReading", "typicalRangeHigh")
});




