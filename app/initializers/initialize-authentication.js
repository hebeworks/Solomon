// app/initializers/initialize-authentication.js

export function initialize(container, application){
  application.inject('adapter', 'session', 'simple-auth-session:main')
}

export default {
  before: 'simple-auth',
  name: 'initialize-authentication',
  initialize: initialize,
};
