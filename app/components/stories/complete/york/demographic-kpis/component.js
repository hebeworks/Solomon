import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    chosenKpi: 'BSC04', // will be altered by a select box when editing the story
    usableKpis: null,
    shortenedKpis: [
        {id: 'BSC03', description: '', short: false},
        {id: 'BSC04', description: '', short: false},
        {id: 'BYS001', description: '', short: false},
        {id: 'BYS053', description: '', short: false},
        {id: 'BYS079', description: '', short: false},
        {id: 'BYS105', description: '', short: false},
        {id: 'BYS131', description: '', short: false},
        {id: 'BYS254', description: '', short: false},
        {id: 'BYS300', description: '', short: false},
        {id: 'BYS301', description: '', short: false},
        {id: 'BYS302', description: '', short: false},
        {id: 'PHOF15', description: '', short: false},
        {id: 'PHOF26', description: '', short: false}
    ], // manually curated KPI descriptions. Set short to 'true' if the description is short enough to display as larger text
    
    onInsertElement: function() {
        this.getData();
    }.on('didInsertElement'),
    
    getData: function() {
        var _this = this;
        var data = {
            resource_id: '04d56453-f3a5-4f19-94e0-ea1d9ddd6838', // dataset ID
        };
        
        $.ajax({
            url: 'https://data.yorkopendata.org/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            success: function(data) {
                var fullKpis = data.result.records; // Get out the actual full data
                var strippedKpis = [];
                
                // Remove data objects we don't need
                fullKpis.forEach(function(item) {
                    if (item.Total != '-' && item.Total != 'N/A') {
                        strippedKpis.push({
                            id: item.Id,
                            desc: item.Indicator,
                            period: item.Year,
                            polarity: item.Polarity,
                            value: item.Total
                        });
                    }
                });
                
                // Group KPI records by KPI ID
                var groupedKpis = _.groupBy(strippedKpis, function(item) {
                    return item.id;
                });
                
                var finalKpis = {};
                
                // Use this grouped list and create singular KPI objects with exactly what we need
                for(var id in groupedKpis) {
                    var items = groupedKpis[id];
                    
                    // Use the second year of the period so we can find the previous period data
                    items = _.sortBy(items,function(obj){
                        return parseInt(obj.period.substr(obj.period.indexOf('/') + 1));
                    });
                    items.reverse();
                    
                    var firstItem = items[0];

                    finalKpis[id] = {
                        desc: firstItem.desc,
                        polarity: firstItem.polarity,
                        currentVal: firstItem.value,
                        currentPeriod: firstItem.period
                    }
                    
                    if(items.length > 1) {
                        finalKpis[id].previousVal = items[1].value;
                        finalKpis[id].previousPeriod = items[1].period;
                    }
                    
                    // This KPI has percentages listed as floats, so lets put '%' back on
                    if (id == 'PHOF15') {
                        finalKpis[id].currentVal = parseInt(firstItem.value) + '%';
                        finalKpis[id].previousVal = parseInt(items[1].value) + '%';
                    }
                }
                
                _this.set('usableKpis', finalKpis);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            }
        });
    },
    
    showKpi: function() {
        var _this = this,
            kpis = _this.usableKpis;
        
        for (var id in kpis) {
            if (id == _this.chosenKpi) {
                _this.set('currentValue', kpis[id]['currentVal']);
                _this.set('previousValue', kpis[id]['previousVal']);
                _this.set('previousPeriod', kpis[id]['previousPeriod']);
                
                _this.shortenedKpis.forEach(function(item) {
                    if (item.id == id) {
                        if (item.short == true) {
                            _this.set('shortText', item.description);
                        } else {
                            _this.set('longText', item.description);
                        }
                    }
                });
                
                var polarity = kpis[id]['polarity'],
                    previousFloat = parseFloat(kpis[id]['previousVal']),
                    currentFloat = parseFloat(kpis[id]['currentVal']);
                    
                if (currentFloat > previousFloat) {
                    _this.set('trend', 'up');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity.indexOf('Up') > -1) {
                        _this.set('rating', 'good');
                    }
                    
                    if (polarity.indexOf('Down') > -1) {
                        _this.set('rating', 'bad');
                    }
                    
                    if (polarity.indexOf('Neutral') > -1) {
                        _this.set('rating', 'neutral');
                    }
                } else if (currentFloat < previousFloat) {
                    _this.set('trend', 'down');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity.indexOf('Up') > -1) {
                        _this.set('rating', 'bad');
                    }
                    
                    if (polarity.indexOf('Down') > -1) {
                        _this.set('rating', 'good');
                    }
                    
                    if (polarity.indexOf('Neutral') > -1) {
                        _this.set('rating', 'neutral');
                    }
                } else {
                    _this.set('rating', 'neutral');
                }
            }
        }
    }.observes('loaded', 'chosenKpi')
});
