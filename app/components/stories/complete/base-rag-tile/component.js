/* global Ember, hebeutils, _ */
import BaseValueTile from 'hebe-dash/components/stories/complete/base-value-tile/component';

export default BaseValueTile.extend({
    layoutName: 'components/stories/complete/base-value-tile',
    
    ragRating: null, // lime (green), yellow (amber), -red (red)
    tileShade: null,
    
    onBaseRagInit: function() {
        this.get('ragRating');
    }.on('init'),
    
    onRagRating: function () {
        console.log('onRagRating: ' + this.get('ragRating'));
        this.set('storyConfig.color',this.get('ragRating'));
    }.observes('ragRating')
});
