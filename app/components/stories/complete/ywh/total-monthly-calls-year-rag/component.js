/* global Ember, hebeutils, _ */
import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onYWHInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileValue: 148,
            tileDesc1: 'Total calls in Nov',
            tileDesc2: 'UP 4% on 2014',
        });
    }.on('init')
});
