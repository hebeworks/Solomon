import Ember from 'ember';
import BidEditSectionMixin from '../../../mixins/bid/edit-section';
import { module, test } from 'qunit';

module('Unit | Mixin | bid/edit section');

// Replace this with your real tests.
test('it works', function(assert) {
  var BidEditSectionObject = Ember.Object.extend(BidEditSectionMixin);
  var subject = BidEditSectionObject.create();
  assert.ok(subject);
});
