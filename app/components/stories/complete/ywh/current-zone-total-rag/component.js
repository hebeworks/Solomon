import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onRagStoryInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileValue: '',
            tileDesc1: '',
            tileDesc2: '',
        });
        // this.get('appSettings.')
    }.on('init'),
    
    onCanvasSettings: function(){
        var canvasSettings = this.get('appSettings.canvasSettings');
        this.set('tileValue',canvasSettings.selectedZone.text);
    }.observes('appSettings.canvasSettings.selectedZone'),
});
