import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {

  didInsertElement: function () {
    this.set('userID', this.get('currentUser.id'));
  },

  onUserChange: function(){
    this.set('userID', this.get('currentUser.id'));
  }.observes('currentUser.id')

});
