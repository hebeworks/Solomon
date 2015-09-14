// app/authorizers/unique-token.js
import Base from 'simple-auth/authorizers/base';

export default Base.extend({

    authorize: function (jqXHR, requestOptions) {
        // debugger;
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.secure.token'))) {
            jqXHR.setRequestHeader('Authorization', 'Token: ' + this.get('session.secure.token'));
        }
    }
        
    // authorize: function(jqXHR, requestOptions) {
    //     console.log(jqXHR);
    //     console.log(requestOptions);
    // }
});
