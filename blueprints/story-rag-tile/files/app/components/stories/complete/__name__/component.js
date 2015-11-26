import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onRagStoryInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileValue: '',
            tileDesc1: '',
            tileDesc2: '',
        });
    }.on('init')
});
