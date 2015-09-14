import Ember from 'ember';

export default Ember.Controller.extend({
    ////////////////////////////////////////
    // Properties 
    ////////////////////////////////////////
    siteTitle: function () {
        return 'Leeds Gallery Title';
    }.property(),

    appController: function () {
        return this.controllerFor('Application');
    }.property(),

    galleryNavItems: function () {
        var items = [
            { title: 'Back', action: 'goBack' },
            //            { title: 'Browse' },
            //            { title: 'My Collection' },
            //            { title: 'Search' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-gallery-' + dashed;
            items[i].iconclass = 'icon-' + dashed;
            items[i].svgclass = 'svg-' + dashed;
        }
        return items;
    }.property(),
    
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