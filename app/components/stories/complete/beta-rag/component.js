import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    currentValue: '73%',
    previousValue: '68%',
    previousPeriod: '2014/2015',
    longText: 'of residents feel people of different backgrounds get on well in their local area',
    
    didInsertElement: function() {
        var _this = this;
        _this.set('rating', 'good');
        _this.set('loaded', 'true');
        _this.set('trend', 'up');
    }.on('didInsertElement')
});
