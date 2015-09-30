import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['js-story story'],
    classNameBindings: ['color', 'width', 'height'],
    attributeBindings: ['data-ss-colspan', 'data-id', 'data-canvas-order-index'],
    
    isDraggingStory: false,
    
    'data-id':Ember.computed.alias('target.storyModel.id'),
    'data-canvas-order-index':Ember.computed.alias('target.storyModel.canvasOrderIndex'),
    
    storyModel: Ember.computed.alias('target.storyModel'),
    
    configFields: Ember.computed({
        get() {
            return (!Ember.isEmpty(this.get('storyModel.config')) ? 
                this.get('storyModel.config').copy() : 
                []);
        }
    }),
    
    onFieldsChanged: function() {
        var model = this.get('storyModel');
        model.set('config',this.get('configFields'));
    }.observes('configFields', 'configFields.@each.value'),
    
    didInsertElement: function () {
        // todo: ensure this is run minimal times throughout the entire app
        // possibly add to application route and ember.run once
        grunticon.embedSVG();
        this.setupDragEvents();
        this.set('action', 'onStoryLoaded');
        this.sendAction();
    },
    
    setupDragEvents: function () {
        var obj = this;
        var cog = this.$('.js-cogs');

        if (Modernizr.cssanimations) {
            obj.$('.story__inner').addClass('-support-3d');
        } else {
            obj.$('.story__inner').addClass('-fallback-3d');
        }

        cog
            .on('touchstart mousedown', function (e) {
                obj.set('isDraggingStory', false);
            })
            .on('touchmove mousemove', function (e) {
                obj.set('isDraggingStory', true);
            });

        var isTouchDevice = 'ontouchstart' in document.documentElement;

        if (isTouchDevice) {
            cog
                .on('touchend', function (e) {

                    var $el = $(this);
                    if (obj.get('isDraggingStory') == false) {
                        $el.closest('.story__inner').toggleClass('-flip');
                    }
                });
        } else {
            cog
                .on('mouseup', function (e) {

                    var $el = $(this);
                    if (obj.get('isDraggingStory') == false) {
                        $el.closest('.story__inner').toggleClass('-flip');
                    }
                });
        }
    }
});
