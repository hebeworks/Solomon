import Ember from 'ember';
import ManipulationPanelContentMixin from '../../../mixins/manipulation-panel-content';
import { module, test } from 'qunit';

module('Unit | Mixin | manipulation panel content');

// Replace this with your real tests.
test('it works', function(assert) {
  var ManipulationPanelContentObject = Ember.Object.extend(ManipulationPanelContentMixin);
  var subject = ManipulationPanelContentObject.create();
  assert.ok(subject);
});
