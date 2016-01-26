import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    didInsertElement: function() {
        var _this = this;
        _this.set('rating', 'good');
        _this.set('loaded', 'true');
    }.on('didInsertElement')
});
