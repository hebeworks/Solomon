import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stories/complete/weather-forecast/weather-period', 'Integration | Component | stories/complete/weather forecast/weather period', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stories/complete/weather-forecast/weather-period}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stories/complete/weather-forecast/weather-period}}
      template block text
    {{/stories/complete/weather-forecast/weather-period}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
