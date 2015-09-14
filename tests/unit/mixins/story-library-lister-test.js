import Ember from 'ember';
import StoryLibraryListerMixin from '../../../mixins/story-library-lister';
import { module, test } from 'qunit';

module('Unit | Mixin | story library lister');

// Replace this with your real tests.
test('it works', function(assert) {
  var StoryLibraryListerObject = Ember.Object.extend(StoryLibraryListerMixin);
  var subject = StoryLibraryListerObject.create();
  assert.ok(subject);
});
