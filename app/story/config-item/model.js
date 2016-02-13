import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),

  value: DS.attr('string'),

  type: DS.attr('string'),
  
  contentPath: DS.attr('string'),

  sourceContent: DS.attr('string'),

  placeholder: DS.attr('string')
});
