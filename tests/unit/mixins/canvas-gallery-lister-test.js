import Ember from 'ember';
import CanvasGalleryListerMixin from '../../../mixins/canvas-gallery-lister';
import { module, test } from 'qunit';

module('Unit | Mixin | canvas gallery lister');

// Replace this with your real tests.
test('it works', function(assert) {
  var CanvasGalleryListerObject = Ember.Object.extend(CanvasGalleryListerMixin);
  var subject = CanvasGalleryListerObject.create();
  assert.ok(subject);
});
