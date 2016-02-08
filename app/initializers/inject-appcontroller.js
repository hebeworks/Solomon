export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  
  // Inject appController into components 
  // var appController = container.lookup('controller:application');
  application.inject('component', 'appController', 'controller:application');
  
  // Inject appController into other controllers
  Ember.Controller.reopen({
    appController: function () {
      return this.controllerFor('Application');
    }.property(),
  });
}

export default {
  name: 'inject-appcontroller',
  initialize: initialize
};
