import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Ember.Component.extend(ResizeAware, ManipulationPanelContent, {
    message: '',
    isSaving: false,

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
            this.set('editableFieldAttributes.' + field.get('name'), field.get('value'))
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
    
    debouncedDidResize() {
        console.log('edit-a-story.debouncedDidResize');
        this.panCanvas();
    },
    
    panCanvas: function() {
        var canvas = $('[cpn-canvas]'),
            panelWidth = $('[cpn-manipulation-panel]').width(),
            headerHeight = 100,
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
        
        canvas
            .attr('cpn-canvas', '')
            .css('transform', 'none');
        
        if (visibleCanvas >= storyWidth) {
            canvas
                .attr('cpn-canvas', 'is-panned')
                .css('transform', 'translateX(' + panXAmount() + 'px) translateY(' + panYAmount() + 'px)');
        } else {
            canvas
                .attr('cpn-canvas', '')
                .css('transform', 'none');
        }
    },
    
    unpanCanvas: function() {
        $('[cpn-canvas]')
            .attr('cpn-canvas', '')
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
