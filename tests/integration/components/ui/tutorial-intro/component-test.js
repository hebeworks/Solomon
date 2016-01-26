import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/tutorial-intro', 'Integration | Component | ui/tutorial intro', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/tutorial-intro}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/tutorial-intro}}
      template block text
    {{/ui/tutorial-intro}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
