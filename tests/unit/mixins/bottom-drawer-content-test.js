import Ember from 'ember';
import BottomDrawerContentMixin from '../../../mixins/bottom-drawer-content';
import { module, test } from 'qunit';

module('Unit | Mixin | bottom drawer content');

// Replace this with your real tests.
test('it works', function(assert) {
  var BottomDrawerContentObject = Ember.Object.extend(BottomDrawerContentMixin);
  var subject = BottomDrawerContentObject.create();
  assert.ok(subject);
});
