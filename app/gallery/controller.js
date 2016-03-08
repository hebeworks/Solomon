import Ember from 'ember';

export default Ember.Controller.extend({
    ////////////////////////////////////////
    // Properties 
    ////////////////////////////////////////
    siteTitle: function () {
        return 'Leeds Gallery Title';
    }.property(),

    galleryNavItems: function () {
        var items = [
            { title: 'Back', action: 'goBack', iconName: 'back' },
            //            { title: 'Browse' },
            //            { title: 'My Collection' },
            //            { title: 'Search' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-gallery-' + dashed;
            items[i].iconclass = 'icon--' + items[i].iconName;
            items[i].svgclass = 'svg-icon--' + items[i].iconName;
        }
        return items;
    }.property(),
    
    blurred: function () {
        return (this.get('appController.canvasBlurred') ? '-blurred' : '');
    }.property('appController.canvasBlurred'),
    
    ////////////////////////////////////////
    // Functions
    ////////////////////////////////////////
    viewCanvasDetails: function (canvas) {
        // var canvasID = canvas.get('id');
        this.get('appController').openBottomDrawer({ contentType: 'canvas-gallery/create-a-canvas', model: canvas });
    },

    ////////////////////////////////////////
    // Actions
    ////////////////////////////////////////
    actions: {
        viewCanvasDetails: function (canvas) {
            this.viewCanvasDetails(canvas);
        }
    }
});