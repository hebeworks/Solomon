import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/forms/editable-field', 'Integration | Component | ui/forms/editable field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/forms/editable-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/forms/editable-field}}
      template block text
    {{/ui/forms/editable-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
