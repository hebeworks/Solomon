import Ember from 'ember';
import DashComponentBaseMixin from '../../../mixins/dash-component-base';
import { module, test } from 'qunit';

module('Unit | Mixin | dash component base');

// Replace this with your real tests.
test('it works', function(assert) {
  var DashComponentBaseObject = Ember.Object.extend(DashComponentBaseMixin);
  var subject = DashComponentBaseObject.create();
  assert.ok(subject);
});
