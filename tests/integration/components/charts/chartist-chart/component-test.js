import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/chartist-chart', 'Integration | Component | charts/chartist chart', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/chartist-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/chartist-chart}}
      template block text
    {{/charts/chartist-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
