import Ember from 'ember';
import CanvasGalleryLister from 'hebe-dash/mixins/canvas-gallery-lister';

export default Ember.Component.extend(CanvasGalleryLister, {

  profile: Ember.computed.alias('session.secure.profile'),

  profileMeta: Ember.computed.alias('profile.user_metadata'),

  profileAppMeta: Ember.computed.alias('profile.app_metadata')

});
