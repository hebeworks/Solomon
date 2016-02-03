// app/instance-initializers/current-user.js

export default {
  name: "current-user",

  initialize: function({ registry }) {
    const proxy = Ember.computed.alias('session.secure.profile');
    registry.register('service:current-user', proxy, { instantiate: false, singleton: true });
    registry.injection('route', 'currentUser', 'service:current-user');
    registry.injection('controller', 'currentUser', 'service:current-user');
    registry.injection('component', 'currentUser', 'service:current-user');
  }
};
