import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ManipulationPanelContent, {
    message: '',
    isSaving: false,
    isPanned: false,

    onInserted: function () {
        this.set('isSaving', false);
    }.on('didInsertElement'),

    editableFields: function () {
        return this.get('model.config');
    }.property('model'),

    editableFieldAttributes: function () {
        return {};
    }.property('model'),

    storeEditableFieldValues: function () {
        const fields = this.get('editableFields');

        if (!fields)
            return;

        fields.forEach(function (field) {
            this.set('editableFieldAttributes.' + field.get('name'), field.get('value'));
        }.bind(this));
    }.on('init').observes('model'),

    restoreEditableFieldValues: function () {
        const fields = this.get('editableFields');

        if (!fields)
            return;

        fields.forEach(function (field) {
            field.set('value', this.get('editableFieldAttributes.' + field.get('name')));
        }.bind(this));
    },

    save: function () {
        this.set('isSaving', true);
        this.set('action', 'saveCanvasState');
        this.sendAction('action');
    },
    
    onIsOpening: function() {
        if (this.get('isOpening') && (this.get('content') == 'stories/edit-a-story')) {
            this.panCanvas();
        }
    }.on('didInsertElement').observes('isOpening', 'model', 'content'),

    onIsClosing: function () {
        if (!this.get('isSaving') && this.get('isClosing')) {
            this.restoreEditableFieldValues();
        }
        if (this.get('isSaving') === true) {
            this.set('isSaving', false);
        }
        
        this.unpanCanvas();
    }.observes('isClosing'),
    
    onWindowResize: function() {
        this.panCanvas();
    }.observes('viewportWidth'),
    
    panCanvas: function() {
        var _this = this,
            canvas = $('[cpn-canvas]'),
            headerHeight = 100,
            panelWidth = $('[cpn-manipulation-panel]').width(),
            visibleCanvas = $(window).width() - panelWidth,
            storyID = this.get('model.id'),
            storyElement = $('[data-id="' + storyID + '"]'),
            storyWidth = storyElement.outerWidth(),
            storyXPosition = storyElement.offset().left,
            storyYPosition = storyElement.offset().top,
            panXAmount = function() {
                if (storyXPosition > panelWidth) {
                    return (storyXPosition - panelWidth) * -1;
                    
                } else if (storyXPosition < panelWidth) {
                    return panelWidth - storyXPosition;
                    
                } else {
                    return 0;
                }
            },
            panYAmount = function() {
                if (storyYPosition > headerHeight) {
                    return (storyYPosition - headerHeight) * -1;
                    
                } else if (storyYPosition < headerHeight) {
                    return storyYPosition + headerHeight;
                    
                } else {
                    return 0;
                }
            };
        
        function newPan() {
            console.log('newPan');
            console.log('isPanned' + _this.get('isPanned'));
            canvas
                .attr('cpn-canvas', 'is-panned')
                .attr('data-panx', panXAmount())
                .attr('data-pany', panYAmount())
                .css('transform', 'translateX(' + panXAmount() + 'px) translateY(' + panYAmount() + 'px)');
                
            _this.set('isPanned', true);
            console.log('storyElement');
            console.log(storyElement);
        }
        
        function rePan() {
            console.log('rePan');
            var prePannedXAmount = canvas.data('panx'),
                prePannedYAmount = canvas.data('pany'),
                rePanXAmount = function() {
                    if (storyXPosition > panelWidth) {
                        var positionXDiff = storyXPosition - panelWidth,
                            newPanXAmount = prePannedXAmount - positionXDiff;
                        console.log('===========================');
                        console.log('storyXPosition > panelWidth');
                        console.log('storyXPosition: ' + storyXPosition);
                        console.log('panelWidth: ' + panelWidth);
                        console.log('prePannedXAmount: ' + prePannedXAmount);
                        console.log('===========================');
                        return newPanXAmount;
                        
                    } else if (storyXPosition < panelWidth) {
                        var positionXDiff = panelWidth - storyXPosition,
                            newPanXAmount = prePannedXAmount + positionXDiff;
                            console.log('===========================');
                            console.log('storyXPosition < panelWidth');
                            console.log('storyXPosition: ' + storyXPosition);
                            console.log('panelWidth: ' + panelWidth);
                            console.log('prePannedXAmount: ' + prePannedXAmount);
                            console.log('===========================');
                        return newPanXAmount;
                        
                    } else {
                        return 0;
                    }
                },
                rePanYAmount = function() {
                    if (storyYPosition > headerHeight) {
                        var positionYDiff = storyYPosition - headerHeight,
                            newPanYAmount = prePannedYAmount - positionYDiff;
                        return newPanYAmount;
                        
                    } else if (storyYPosition < headerHeight) {
                        var positionYDiff = headerHeight - storyYPosition,
                            newPanYAmount = prePannedYAmount + positionYDiff;
                        return newPanYAmount;
                        
                    } else {
                        return 0;
                    }
                };
            canvas
                .data('panx', rePanXAmount())
                .data('pany', rePanYAmount())
                .css('transform', 'translateX(' + rePanXAmount() + 'px) translateY(' + rePanYAmount() + 'px)');
            console.log('rePanXAmount: ' + rePanXAmount());
            console.log('rePanYAmount: ' + rePanYAmount());
            console.log('storyElement');
            console.log(storyElement);
        }
        
        if (visibleCanvas >= storyWidth) {
            if (_this.get('isPanned') === false) {
                newPan();
            } else {
                rePan();
            }
        } else {
            canvas
                .attr('cpn-canvas', '')
                .attr('data-panx', '')
                .attr('data-pany', '')
                .css('transform', 'none');
            this.set('panState', false);
        }
    },
    
    unpanCanvas: function() {
        this.set('panState', false);
        $('[cpn-canvas]')
            .attr('cpn-canvas', '')
            .attr('data-panx', '')
            .attr('data-pany', '')
            .css('transform', 'none');
    },

    actions: {
        save: function () {
            this.save();
            this.send('close');
        },
        cancel: function () {
            this.restoreEditableFieldValues();
            this.send('close');
        },
        close: function () {
            this.set('action', 'closeManipulationPanel');
            this.sendAction('action');
        }
    }
});
