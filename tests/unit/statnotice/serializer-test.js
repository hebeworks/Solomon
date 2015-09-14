import { moduleForModel, test } from 'ember-qunit';

moduleForModel('statnotice', 'Unit | Serializer | statnotice', {
  // Specify the other units that are required for this test.
  needs: ['serializer:statnotice']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
