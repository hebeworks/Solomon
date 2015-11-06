import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from 'hebe-dash/config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.TextField.reopen({
    attributeBindings: ['cpn-input', 'autocapitalize', 'autocorrect'],
    'cpn-input': '',
    'autocapitalize': 'none',
    'autocorrect': 'none'
});

export default App;
