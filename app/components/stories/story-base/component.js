import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    color: '',
    width: '',
    height: '',
    headerImage: '',
    support3d: '',
    storyFlip: 'not-flipped',
    title: '',
    description: '',
    license: '',
    slider: false,
    scroll: true,
    
    attributeBindings: ['data-ss-colspan', 'data-id', 'data-canvas-order-index', 'cpn-story'],
    
    // Turn the provided height and width settings
    // into the attribute values we need.
    usableHeight: Ember.computed(function() {
        return 'height-' + this.height;
    }),
    
    usableWidth: Ember.computed(function() {
        return 'width-' + this.width;
    }),
    
    // Pass the width and height settings
    // into the story component.
    'cpn-story': Ember.computed(function() {
        return 'width-' + this.width + ' ' + 'height-' + this.height;
    }),
    
    // Tell the story component if there is a header.
    hasHeader: Ember.computed(function() {
        if (this.headerImage != '' || this.title != '') {
            return 'has-header';
        } else {
            return 'no-header';
        }
    }),
    
    // Tell the story component if there is a footer.
    hasFooter: Ember.computed(function() {
        if (this.viewOnly) {
            return '';
        } else {
            return 'has-footer';
        }
    }),
    
    // We only want a dividing line under the header on larger stories.
    hasHeaderDivide: Ember.computed(function() {
        var obj = this;
        
        if (this.height == 1) {
            return '';
        } else {
            return 'cpn-divide="bottom solid ' + this.get('lineShade') + '"';
        }
    }),
    
    // Allow HTML, such as links, to be passed into the description and license.
    usableDescription: Ember.computed(function() {
        return new Ember.Handlebars.SafeString(this.get('description'));
    }),
    
    usableLicense: Ember.computed(function() {
        return new Ember.Handlebars.SafeString(this.get('license'));
    }),
    
    // Change the shade of the dotted lines based on the story colour.
    darkColours: ['black', 'dark-grey', 'yellow', 'dark-blue', 'blue', 'light-blue', 'lighter-blue', 'lime', 'red'],
    lineShade: Ember.computed(function() {
        if($.inArray(this.color, this.darkColours) !== -1) {
            return 'light';
        } else {
            return 'dark';
        }
    }),
    
    // Set if the story has a slider, which will then alter the structure accordingly.
    hasSlider: Ember.computed(function() {
        if (this.slider) {
            return 'has-slider';
        } else {
            return 'no-slider';
        }
    }),
    
    // Set if the story can scroll its content.
    canScroll: Ember.computed(function() {
        if (this.scroll) {
            return 'can-scroll';
        } else {
            return 'no-scroll';
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
