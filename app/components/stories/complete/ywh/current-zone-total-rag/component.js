import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';

export default BaseRAGTile.extend({
    onRagStoryInit: function () {
        this.setProperties({
            ragRating: 'red',
            tileValue: '',
            tileDesc1: '',
            tileDesc2: '',
        });
    }.on('init'),
    
    onCanvasSettings: function(){
        this.set('tileValue',this.get('appSettings.canvasSettings.ywFilter.selectedZone.text'));
    }.observes('appSettings.canvasSettings.ywFilter.selectedZone'),
});
