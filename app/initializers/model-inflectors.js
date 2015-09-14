import Ember from 'ember';

export function initialize(/* container, application */) {
  var inflector = Ember.Inflector.inflector;
//  inflector.uncountable('aamc-pcrs');
  inflector.irregular('canvas', 'canvases');
  inflector.irregular('story', 'stories');
//  inflector.irregular('testy', 'testies');
  //inflector.singular(/nota/, 'nota');
}

export default {
  name: 'inflector',
  initialize: initialize
};