/* globals $ */
import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ManipulationPanelContent, {
  message: '',
  isSaving: false,
  isPanned: false,
  pannedXAmount: 0,
  pannedYAmount: 0,

  onInserted: function onInserted() {
    this.set('isSaving', false);
  }.on('didInsertElement'),

  editableFields: function editableFields() {
    return this.get('model.config');
  }.property('model'),

  editableFieldAttributes: function editableFieldAttributes() {
    return {};
  }.property('model'),

  storeEditableFieldValues: function storeEditableFieldValues() {
    const fields = this.get('editableFields');

    if (!fields) return;

    fields.forEach(function (field) {
      this.set('editableFieldAttributes.' + field.get('name'), field.get('value'));
    }.bind(this));
  }.on('init').observes('model'),

  restoreEditableFieldValues: function restoreEditableFieldValues() {
    const fields = this.get('editableFields');

    if (!fields) return;

    fields.forEach(function (field) {
      field.set('value', this.get('editableFieldAttributes.' + field.get('name')));
    }.bind(this));
  },

  save() {
    this.set('isSaving', true);
    this.set('action', 'saveCanvasState');
    this.sendAction('action');
  },

  onIsOpening: function onIsOpening() {
    if (this.get('isOpening') && (this.get('content') == 'stories/edit-a-story')) {
      this.panCanvas();
    }
  }.on('didInsertElement').observes('isOpening', 'model', 'content'),

  onIsClosing: function onIsClosing() {
    if (!this.get('isSaving') && this.get('isClosing')) {
      this.restoreEditableFieldValues();
    }
    if (this.get('isSaving') === true) {
      this.set('isSaving', false);
    }

    this.unpanCanvas();
  }.observes('isClosing'),

  onWindowResize: function onWindowResize() {
    this.panCanvas();
  }.observes('viewportWidth'),

  panCanvas() {
    const _this = this;
    const canvas = $('[cpn-canvas]');
    const headerHeight = 100;
    const panelWidth = $('[cpn-manipulation-panel]').width();
    const visibleCanvas = $(window).width() - panelWidth;
    const storyID = this.get('model.id');
    const storyElement = $('[data-id="' + storyID + '"]');
    const storyWidth = storyElement.outerWidth();
    const storyXPosition = storyElement.offset().left;
    const storyYPosition = storyElement.offset().top;
    const pannedXAmount = _this.get('pannedXAmount');
    const pannedYAmount = _this.get('pannedYAmount');

    function panXAmount() {
      if (storyXPosition > panelWidth) {
        return (storyXPosition - panelWidth) * -1;
      } else if (storyXPosition < panelWidth) {
        return panelWidth - storyXPosition;
      }
      return 0;
    }
    function panYAmount() {
      if (storyYPosition > headerHeight) {
        return (storyYPosition - headerHeight) * -1;
      } else if (storyYPosition < headerHeight) {
        return storyYPosition + headerHeight;
      }
      return 0;
    }

    function newPan() {
      canvas
        .attr('cpn-canvas', 'is-panned')
        .css('transform', 'translateX(' + panXAmount() + 'px) translateY(' + panYAmount() + 'px)');

      _this.setProperties({
        isPanned: true,
        pannedXAmount: panXAmount(),
        pannedYAmount: panYAmount(),
      });
    }

    function rePan() {
      function rePanXAmount() {
        if (storyXPosition > panelWidth) {
          const positionXDiff = storyXPosition - panelWidth;
          const newPanXAmount = pannedXAmount - positionXDiff;
          return newPanXAmount;
        } else if (storyXPosition < panelWidth) {
          const positionXDiff = panelWidth - storyXPosition;
          const newPanXAmount = pannedXAmount + positionXDiff;
          return newPanXAmount;
        }
        return 0;
      }
      function rePanYAmount() {
        if (storyYPosition >= headerHeight) {
          const positionYDiff = storyYPosition - headerHeight;
          const newPanYAmount = pannedYAmount - positionYDiff;
          return newPanYAmount;
        } else if (storyYPosition < headerHeight) {
          const positionYDiff = headerHeight - storyYPosition;
          const newPanYAmount = pannedYAmount + positionYDiff;
          return newPanYAmount;
        }
      }

      canvas.css('transform', 'translateX(' + rePanXAmount() + 'px) translateY(' + rePanYAmount() + 'px)');

      _this.setProperties({
        pannedXAmount: rePanXAmount(),
        pannedYAmount: rePanYAmount()
      });
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
        .css('transform', 'none');

      _this.setProperties({
        panState: false,
        pannedXAmount: 0,
        pannedYAmount: 0,
      });
    }
  },

  unpanCanvas() {
    const _this = this;
    const canvas = $('[cpn-canvas]');

    canvas
      .attr('cpn-canvas', '')
      .css('transform', 'none');

    _this.setProperties({
      panState: false,
      pannedXAmount: 0,
      pannedYAmount: 0,
    });
  },

  actions: {
    save() {
      this.save();
      this.send('close');
    },
    cancel() {
      this.restoreEditableFieldValues();
      this.send('close');
    },
    close() {
      this.set('action', 'closeManipulationPanel');
      this.sendAction('action');
    },
  },
});
