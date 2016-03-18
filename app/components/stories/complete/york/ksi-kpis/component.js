import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onInsertElement: function() {
        this.getData();
    }.on('didInsertElement'),
    
    getData: function() {
        var _this = this;
        var data = {
            resource_id: '6a4ee483-0563-4971-9988-ffd34ba2b9da', // dataset ID
        };
        
        $.ajax({
            url: 'https://data.yorkopendata.org/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            success: function(data) {
                var fullKsis = data.result.records,
                    strippedKsis = [];
                    
                fullKsis.forEach(function(item) {
                    // We only want year values, so strip out any records with monthly or quarterly values
                    if (item.Period.length < 10) {
                        strippedKsis.push({
                            period: item.Period,
                            value: item.Value.substring(0, 2)
                        });
                    }
                });
                
                strippedKsis = _.sortBy(strippedKsis, function(obj) {
                    return parseInt(obj.period.substring(obj.period.indexOf('/') + 1));
                });
                strippedKsis.reverse();
                
                var current = strippedKsis[0],
                    previous = strippedKsis[1];
                
                _this.set('currentValue', current.value);
                _this.set('previousValue', previous.value);
                _this.set('previousPeriod', previous.period);
                
                if (current.value < previous.value) {
                    _this.set('rating', 'good');
                    _this.set('trend', 'down');
                } else if (current.value > previous.value) {
                    _this.set('rating', 'bad');
                    _this.set('trend', 'up');
                } else {
                    _this.set('rating', 'neutral');
                }
                
                _this.set('longText', 'people reported killed or seriously injured in road traffic accidents in ' + current.period);
            }
        });
    }
});
