import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    color: '',
    width: '',
    height: '',
    support3d: '',
    storyFlip: 'not-flipped',
    
    attributeBindings: ['data-ss-colspan', 'data-id', 'data-canvas-order-index', 'cpn-story'],
    
    usableHeight: Ember.computed(function() {
        return 'height-' + this.height;
    }),
    
    usableWidth: Ember.computed(function() {
        return 'width-' + this.width;
    }),
    
    'cpn-story': Ember.computed(function() {
        return 'width-' + this.width + ' ' + 'height-' + this.height;
    }),
    
    hasFooter: Ember.computed(function() {
        if (this.viewOnly) {
            return '';
        } else {
            return 'has-footer';
        }
    }),
    
    isDraggingStory: false,
    
    'data-id':Ember.computed.alias('target.storyModel.id'),
    'data-canvas-order-index':Ember.computed.alias('target.storyModel.canvasOrderIndex'),
    
    storyModel: Ember.computed.alias('target.storyModel'),
    
    configFields: Ember.computed({
        get() {
            return (!Ember.isEmpty(this.get('storyModel.config')) ? this.get('storyModel.config').copy() : []);
        }
    }),
    
    onFieldsChanged: function() {
        this.set('storyModel.config',this.get('configFields'));
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
            obj.$('.story__inner').addClass('-support-3d').attr('cpn-story_inner', 'support-3d');
            obj.set('support3d', 'supports-3d');
        } else {
            obj.$('.story__inner').addClass('-fallback-3d');
            obj.set('support3d', 'fallback-3d');
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
                        
                        if (obj.get('storyFlip') == 'not-flipped') {
                            obj.set('storyFlip', 'flipped');
                        } else {
                            obj.set('storyFlip', 'not-flipped');
                        }
                    }
                });
        }
    }
});
