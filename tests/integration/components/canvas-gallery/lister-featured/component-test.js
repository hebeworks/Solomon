import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('canvas-gallery/lister-featured', 'Integration | Component | canvas gallery/lister featured', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{canvas-gallery/lister-featured}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#canvas-gallery/lister-featured}}
      template block text
    {{/canvas-gallery/lister-featured}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
