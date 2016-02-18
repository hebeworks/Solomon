/* global grunticon, Ember, $ */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    isDraggingStory: false,
    // 'data-id': null, //Ember.computed.alias('target.storyModel.id'),
    'data-id': Ember.computed.alias('storyModel.id'),
    'data-canvas-order-index': Ember.computed.alias('storyModel.canvasOrderIndex'),
    storyModel: Ember.computed('target.storyModel', {
        get() {
            if(!Ember.isEmpty(this.get('target.storyModel'))) {
                return this.get('target.storyModel');
            }
            return this.store.createRecord('story',{});
        }
    }),
    classNames: 'js-story',

    support3d: '',
    storyFlip: 'not-flipped',

    loaded: Ember.computed('target.loaded', function () {
        if (this.get('target.loaded')) {
            return this.get('target.loaded');
        } else {
            return false;
        }
    }),

    defaultConfig: {
        color: 'white',
        width: '2',
        height: '2',
        headerImage: '',
        title: '',
        subTitle: '',
        description: '',
        license: '',
        slider: false,
        scroll: true,
        customProperties: '',
        showLoading: false
    },

    attributeBindings: ['data-ss-colspan', 'data-id', 'data-canvas-order-index', 'cpn-story'],

    storyConfig: Ember.computed(
        'target.storyConfig',
        'target.storyConfig.color',
        'target.storyConfig.width',
        'target.storyConfig.height',
        'target.storyConfig.headerImage',
        'target.storyConfig.title',
        'target.storyConfig.subTitle',
        'target.storyConfig.description',
        'target.storyConfig.license',
        'target.storyConfig.slider',
        'target.storyConfig.scroll',
        'target.storyConfig.customProperties',
        'target.storyConfig.showLoading',
        function () {
            var targetConfig = Ember.Object.create(this.get('target.storyConfig'));
            var defaultConfig = Ember.Object.create(this.get('defaultConfig'));
            Ember.merge(defaultConfig, targetConfig);
            return defaultConfig;
        }),

    // Turn the provided height and width settings into the attribute values we need.
    // Turn the provided height and width settings
    // into the attribute values we need.
    usableHeight: Ember.computed('storyConfig.height', function () {
        return 'height-' + this.get('storyConfig.height');
    }),

    usableWidth: Ember.computed('storyConfig.width', function () {
        return 'width-' + this.get('storyConfig.width');
    }),

    // Pass the width and height settings
    // into the story component.
    'cpn-story': Ember.computed('storyConfig.width', function () {
        if (this.get('storyConfig.customProperties') != '') {
            return 'width-' + this.get('storyConfig.width') + ' ' + 'height-' + this.get('storyConfig.height') + ' ' + this.get('storyConfig.customProperties');
        } else {
            return 'width-' + this.get('storyConfig.width') + ' ' + 'height-' + this.get('storyConfig.height');
        }
    }),

    // Tell the story component if there is a header.
    hasHeader: Ember.computed('storyConfig.headerImage', 'storyConfig.title', function () {
        if (this.get('storyConfig.headerImage') != '' || this.get('storyConfig.title') != '') {
            return 'has-header';
        } else {
            return 'no-header';
        }
    }),

    // Tell the story component if there is a footer.
    hasFooter: Ember.computed('storyConfig.viewOnly', function () {
        if (this.get('storyConfig.viewOnly')) {
            return '';
        } else {
            return 'has-footer';
        }
    }),

    // We only want a dividing line under the header on larger stories.
    hasHeaderDivide: Ember.computed('storyConfig.height', function () {
        if (this.get('storyConfig.height') == 1) {
            return '';
        } else {
            return 'cpn-divide="bottom solid ' + this.get('lineShade') + '"';
        }
    }),

    // Allow HTML, such as links, to be passed into the description and license.
    usableDescription: Ember.computed(function () {
        return new Ember.Handlebars.SafeString(this.get('storyConfig.description'));
    }),

    usableLicense: Ember.computed('storyConfig.license', function () {
        return new Ember.Handlebars.SafeString(this.get('storyConfig.license'));
    }),

    // Change the shade of the dotted lines based on the story colour.
    darkColours: ['black', 'dark-grey', 'yellow', 'dark-blue', 'medium-blue', 'blue', 'light-blue', 'lighter-blue', 'lime', 'red'],
    lineShade: Ember.computed('storyConfig.color', function () {
        if ($.inArray(this.get('storyConfig.color'), this.get('darkColours')) !== -1) {
            return 'light';
        } else {
            return 'dark';
        }
    }),

    // Set if the story has a slider, which will then alter the structure accordingly.
    hasSlider: Ember.computed(function () {
        if (this.get('storyConfig.slider')) {
            return 'has-slider';
        } else {
            return 'no-slider';
        }
    }),

    // Set if the story can scroll its content.
    canScroll: Ember.computed('storyConfig.scroll', function () {
        if (this.get('storyConfig.scroll')) {
            return 'can-scroll';
        } else {
            return 'no-scroll';
        }
    }),

    configFields: Ember.computed({
        get() {
            return (!Ember.isEmpty(this.get('storyModel.config')) ? this.get('storyModel.config').copy() : []);
        }
    }),

    onInit: function () {
        this.set('data-id', hebeutils.guid());
        this.setStoryHandle();
    }.on('init'),

    onDidInsertElement: function () {
        Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
        this.setupDragEvents();
        this.set('action', 'onStoryLoaded');
        this.sendAction();
    }.on('didInsertElement'),

    onFieldsChanged: function () {
        this.set('storyModel.config', this.get('configFields'));
    }.observes('configFields', 'configFields.@each.value'),

    setupDragEvents: function () {
        var _this = this;
        var cog = this.$('.js-cogs');
        var bar = this.$('.js-bars');

        if (Modernizr.cssanimations) {
            _this.$('.story__inner').addClass('-support-3d').attr('cpn-story_inner', 'support-3d');
            _this.set('support3d', 'supports-3d');
        } else {
            _this.$('.story__inner').addClass('-fallback-3d');
            _this.set('support3d', 'fallback-3d');
        }

        cog
            .on('touchstart mousedown', function (e) {
                _this.set('isDraggingStory', false);
            })
            .on('touchmove mousemove', function (e) {
                _this.set('isDraggingStory', true);
            });

        bar
            .on('touchstart mousedown', function (e) {
                _this.set('isDraggingStory', false);
            })
            .on('touchmove mousemove', function (e) {
                _this.set('isDraggingStory', true);
            });

        var isTouchDevice = 'ontouchstart' in document.documentElement;

        if (isTouchDevice) {
            cog
                .on('touchend', function (e) {
                    var $el = $(this);
                    if (_this.get('isDraggingStory') == false) {
                        $el.closest('.story__inner').toggleClass('-flip');
                    }
                });
        } else {
            cog
                .on('mouseup', function (e) {
                    var $el = $(this);
                    if (_this.get('isDraggingStory') == false) {
                        $el.closest('.story__inner').toggleClass('-flip');
                        if (_this.get('storyFlip') == 'not-flipped') {
                            _this.set('storyFlip', 'flipped');
                        } else {
                            _this.set('storyFlip', 'not-flipped');
                        }
                    }
                });
        }
    },

    setStoryHandle: function () {
        var storyHandle = this.get('appSettings.solomonConfig.storyConfig.storyHandle');

        if (storyHandle == 'dot') {
            this.set('storyHandleIsDot', true);

        } else if (storyHandle == 'bar') {
            this.set('storyHandleIsBar', true);

        } else if (storyHandle == 'both') {
            this.set('storyHandleIsBoth', true);

        } else if (storyHandle == 'none') {
            this.set('storyHandleIsNone', true);
        }
    },

    actions: {
        editAStory: function (model) {
            this.set('storyFlip', 'not-flipped');
            this.set('action', 'editAStory');
            this.sendAction('action', model);
        }
    }
});
