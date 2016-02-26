import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Ember.Component.extend(ResizeAware, {
    openState: null,
    content: null,
    
    onPanelStateChange: function() {
        var panelState = this.get('appController.manipulationPanelState');
        
        if (panelState != null) {
            if (!Ember.isEmpty(panelState.content)) {
                this.set('content', panelState.content);
            }
            
            if (panelState.openState == 'is-open') {
                this.openPanel();
            } else {
                this.closePanel();
            }
        }
    }.observes('appController.manipulationPanelState'),
    
    onInsertElement: function() {
        this.setPanelWidth();
    }.on('didInsertElement'),
    
    debouncedDidResize() {
        this.setPanelWidth();
    },
    
    // If we're on smaller screens, the panel needs to be full-width.
    // But this affects the positioning of it so we get the width of the viewport and add that as the panel's nagative left position.
    setPanelWidth: function() {
        var _this = this,
            viewportWidth = _this.$(window).width(),
            panelWidth = 375,
            mq = 499 / 16; // gives em value
        
        if (Modernizr.mq('only screen and (max-width: ' + mq + 'em)')) {
            _this.$('[cpn-manipulation-panel]').css('left', viewportWidth * -1);
        } else {
            _this.$('[cpn-manipulation-panel]').css('left', panelWidth * -1);
        }
    },
    
    openPanel: function() {
        this.set('openState', 'is-open');
    },
    
    closePanel: function() {
        this.set('openState', 'is-closed');
    },
    
    changeContent: function(content) {
        this.set('content', content);
    },
    
    actions: {
        closePanel: function() {
            this.closePanel();
        }
    }
});
