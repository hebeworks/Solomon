import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bid/organisation-edit', 'Integration | Component | bid/organisation edit', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bid/organisation-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bid/organisation-edit}}
      template block text
    {{/bid/organisation-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
