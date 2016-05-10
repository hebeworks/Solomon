import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/modals/delete-canvas', 'Integration | Component | ui/modals/delete canvas', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{ui/modals/delete-canvas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#ui/modals/delete-canvas}}
      template block text
    {{/ui/modals/delete-canvas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
