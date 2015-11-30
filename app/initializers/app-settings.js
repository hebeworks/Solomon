import AppSettings from 'hebe-dash/utils/app-settings';
import SolomonUtils from 'hebe-dash/utils/solomon-utils';

export function initialize(container, app) {
  // application.inject('route', 'foo', 'service:foo');
  container.register('utility:settings', AppSettings, { singleton: true, instantiate: true });
  container.register('utility:main', SolomonUtils, { singleton: true, instantiate: true });

  // Util
  ['controller', 'route', 'component', 'adapter', 'transform', 'model', 'serializer'].forEach(function (type) {
    app.inject(type, 'appSettings', 'utility:settings');
    app.inject(type, 'solomonUtils', 'utility:main');
  });
}

export default {
  name: 'app-settings',
  initialize: initialize
};


