// app/initializers/initialize-authentication.js
export function initialize(container, application) {

  application.inject('adapter', 'session', 'simple-auth-session:main')

  $.ajaxSetup({
      beforeSend: function(xhr) {
        var session = container.lookup('simple-auth-session:main');

        if(session.get('isAuthenticated'))
          xhr.setRequestHeader('Authorization', 'Bearer ' + session.get('secure.jwt'));
      }
  });

}

export default {
  before: 'simple-auth',
  name: 'initialize-authentication',
  initialize: initialize,
};
