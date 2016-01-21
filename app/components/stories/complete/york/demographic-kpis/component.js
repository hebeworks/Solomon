import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    actualKpis: [], // KPI ID and description
    chosenKpiID: null, // set the ID of the selected KPI
    
    didInsertElement: function() {
        var _this = this;
        _this.set('rating', 'good');
        _this.set('loaded', 'true');
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
                
                _this.set('actualKpis', filteredKpis);
                
                console.log('================');
                console.log('KPIs');
                console.log(kpis);
                console.log('================');
                console.log('Filtered KPIs');
                console.log(filteredKpis);
                console.log('================');
            }
        });
    }.on('init'),
    
    showKpi: function() {
        
    }.observes('chosenKPI')
});
