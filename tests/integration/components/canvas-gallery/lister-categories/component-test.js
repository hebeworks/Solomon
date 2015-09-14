import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('canvas-gallery/lister-categories', 'Integration | Component | canvas gallery/lister categories', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{canvas-gallery/lister-categories}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#canvas-gallery/lister-categories}}
      template block text
    {{/canvas-gallery/lister-categories}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
