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
                _this.set('canDelete', isAllowed);
              },
              (/* err */) => {
                _this.set('canDelete', false);
              }
            );
      }
    }
  }.on('didReceiveAttrs').observes('model'),
});
