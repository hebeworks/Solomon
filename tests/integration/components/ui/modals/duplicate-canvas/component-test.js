import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/modals/duplicate-canvas', 'Integration | Component | ui/modals/duplicate canvas', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/modals/duplicate-canvas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/modals/duplicate-canvas}}
      template block text
    {{/ui/modals/duplicate-canvas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
