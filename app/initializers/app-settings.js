import AppSettings from 'hebe-dash/utils/app-settings';

export function initialize(container, app) {
  // application.inject('route', 'foo', 'service:foo');
  container.register('utility:settings', AppSettings, { singleton: true, instantiate: true });

  // Util
  ['controller', 'route', 'component', 'adapter', 'transform', 'model', 'serializer'].forEach(function (type) {
    app.inject(type, 'appSettings', 'utility:settings');
  });
}

export default {
  name: 'app-settings',
  initialize: initialize
};


