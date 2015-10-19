import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stories/complete/find-my-bin-day/bin-date', 'Integration | Component | stories/complete/find my bin day/bin date', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stories/complete/find-my-bin-day/bin-date}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stories/complete/find-my-bin-day/bin-date}}
      template block text
    {{/stories/complete/find-my-bin-day/bin-date}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
