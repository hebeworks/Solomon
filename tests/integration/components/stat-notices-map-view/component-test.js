import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stat-notices-map-view', 'Integration | Component | stat notices map view', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stat-notices-map-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stat-notices-map-view}}
      template block text
    {{/stat-notices-map-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
