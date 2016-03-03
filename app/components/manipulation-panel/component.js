import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ResizeAware, ManipulationPanelContent, {
    content: Ember.computed.alias('panelOptions.content'),

    openState: Ember.computed('isClosing', 'isOpening', {
        get() {
            if (this.get('isOpening') === true) {
                return 'is-open';
            }
            return 'is-closed';
        }
    }),

    onInsertElement: function () {
        this.setPanelWidth();
    }.on('didInsertElement'),

    debouncedDidResize() {
        console.log('manipulation-panel.debouncedDidResize');
        this.setPanelWidth();
    },
    
    // If we're on smaller screens, the panel needs to be full-width.
    // But this affects the positioning of it so we get the width of the viewport and add that as the panel's nagative left position.
    setPanelWidth: function () {
        var _this = this,
            viewportWidth = _this.$(window).width(),
            panelWidth = 375,
            mq = 499 / 16; // gives em value
        
        if (Modernizr.mq('only screen and (max-width: ' + mq + 'em)')) {
            _this.$('[cpn-manipulation-panel]').css('left', viewportWidth * -1);
        } else {
            _this.$('[cpn-manipulation-panel]').css('left', panelWidth * -1);
        }
    }
});
