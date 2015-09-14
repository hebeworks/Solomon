// app/initializers/initialize-authentication.js
import CustomAuthenticator from './../simple-auth/authenticators/unique-token';
import CustomAuthorizer from './../simple-auth/authorizers/unique-token';

export function initialize(container, application) {
  // container.register('simple-auth-authorizer:unique-token', CustomAuthorizer);
  // container.register('simple-auth-authenticator:unique-token', CustomAuthenticator);
  container.register('authorizer:unique', CustomAuthorizer);
  container.register('authenticator:unique', CustomAuthenticator);
  
}

export default {
  before: 'simple-auth',
  name: 'initialize-authentication',
  initialize: initialize,
};

