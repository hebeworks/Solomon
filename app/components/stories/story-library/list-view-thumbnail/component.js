import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['cpn-thumb-list_item'],
  'cpn-thumb-list_item': '',

  canDelete: false,
  fetchIfCanDelete: function fetchIfCanDelete() {
    const _this = this;
    if (this.get('model')) {
      const modelType = this.model.get('constructor').typeKey;
      const allowedScope = this.model.get('id');
      const allowedModelType = 'canvas';
      const allowedAction = 'delete';

      if (modelType === 'canvas') {
        this.get('appSettings')
          .isAllowed(allowedScope, allowedModelType, allowedAction)
            .then(
              (isAllowed) => {
                _this.set('cpn-thumb-list_item', 'can-delete');
                _this.set('canDelete', isAllowed);
              },
              (/* err */) => {
                _this.set('cpn-thumb-list_item', '');
                _this.set('canDelete', false);
              }
            );
      }
    }
  }.on('didReceiveAttrs').observes('model'),
  
  // Match the heights of items with delete buttons
  onCanDelete: function onCanDelete() {
    this.matchItemHeights();
  }.observes('canDelete'),
  
  onCanvasDeleted: function onCanvasDeleted() {
    const reason = this.get('appSettings.generalMessage.messageReason');
    
    if (reason === 'canvas-deleted') {
      this.matchItemHeights();
    }
  }.observes('appSettings.generalMessage.messageReason'),
  
  matchItemHeights: function matchItemHeights() {
    setTimeout(function() {
      this.$.fn.matchHeight._apply(this.$('[cpn-thumb-list_item~="can-delete"]'));
    });
  }
});
