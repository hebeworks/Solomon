import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    kpiReference: [], // KPI ID and description
    kpiData: [], // actual
    usableKpis: null,
    chosenKpi: 'BYS300', // set the ID of the selected KPI
    
    onInsertElement: function() {
        this.getData();
    }.on('didInsertElement'),
    
    getData: function() {
        var _this = this;
        var data = {
            resource_id: '04d56453-f3a5-4f19-94e0-ea1d9ddd6838', // the resource id
        };
        $.ajax({
            url: 'https://data.yorkopendata.org/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            success: function(data) {
                // Create a list of KPI IDs and descriptions
                var kpis = [],
                    records = data.result.records;
                
                records.forEach(function(item) {
                    kpis.push([
                        item.Id,
                        item.Indicator
                    ]);
                });
                
                kpis = _.groupBy(kpis, function(item) {
                    return item[0];
                });
                
                kpis = _.values(kpis);
                
                var filteredKpis = [];
                kpis.forEach(function(item) {
                    filteredKpis.push([
                        item[0]
                    ]);
                });
                
                filteredKpis = _.flatten(filteredKpis, true);
                
                _this.set('kpiReference', filteredKpis);
                
                // Create a list of KPIs and their data
                var kpiData = [];
                
                records.forEach(function(item) {
                    if (item.Total != '-' && item.Total != 'N/A') {
                        kpiData.push({
                            id: item.Id,
                            desc: item.Indicator,
                            period: item.Year,
                            polarity: item.Polarity,
                            value: item.Total
                        });
                    }
                });
                
                var natesKpis = _.groupBy(kpiData, function(item) {
                    return item.id;
                });
                
                var finalKPIs = {};
                for(var id in natesKpis) {
                    var items = natesKpis[id];

                    items = _.sortBy(items,function(obj){
                        return parseInt(obj.period.substr(obj.period.indexOf('/') + 1));
                    });
                    items.reverse();
                    var firstItem = items[0];

                    finalKPIs[id] = {
                        desc: firstItem.desc,
                        polarity: firstItem.polarity,
                        currentVal: firstItem.value,
                        currentPeriod: firstItem.period
                    }
                    
                    if(items.length > 1) {
                        finalKPIs[id].previousVal = items[1].value;
                        finalKPIs[id].previousPeriod = items[1].period;
                    }
                }
                
                _this.set('usableKpis', finalKPIs);
                
                console.log(finalKPIs);
                
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
                _this.set('longText', kpis[id]['desc']);
                
                var polarity = kpis[id]['polarity'],
                    previousFloat = parseFloat(kpis[id]['previousVal']),
                    currentFloat = parseFloat(kpis[id]['currentVal']);
                    
                console.log('PrevF: ' + previousFloat);
                console.log('CurrF: ' + currentFloat);
                console.log('Polarity: ' + polarity);
                    
                if (currentFloat > previousFloat) {
                    console.log('Current is greater than previous');
                    _this.set('trend', 'up');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity.indexOf('Up') > -1) {
                        _this.set('rating', 'good');
                    }
                    
                    if (polarity.indexOf('Down') > -1) {
                        _this.set('rating', 'bad');
                    }
                } else if (currentFloat < previousFloat) {
                    console.log('Current is less than previous');
                    _this.set('trend', 'down');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity.indexOf('Up') > -1) {
                        _this.set('rating', 'bad');
                    }
                    
                    if (polarity.indexOf('Down') > -1) {
                        _this.set('rating', 'good');
                    }
                } else {
                    console.log('Current is the same as previous');
                    _this.set('rating', 'neutral');
                }
            }
        }
    }.observes('loaded', 'chosenKpi')
});
