// app/authenticators/custom.js
import Base from 'simple-auth/authenticators/base';
import config from 'hebe-dash/config/environment';

export default Base.extend({
    tokenEndpoint: config.APP.solomonAPIURL + '/api/auth',
    restore: function (data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
                // todo add user data to session
            } else {
                reject();
            }
        });
    },
    authenticate: function (username) {
        var _this = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                url: _this.tokenEndpoint,
                type: 'POST',
                // data: JSON.stringify({ session: { identification: credentials.identification, password: credentials.password } }),
                data: JSON.stringify({ token: username }),
                contentType: 'application/json'
            }).then(function (response) {
                Ember.run(function () {
                    resolve({ token: response.user._id });
                    // resolve({ token: response.token });
                });
            }, function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                Ember.run(function () {
                    reject(response.error);
                });
            });
        });
    },
    invalidate: function () {
        var _this = this;
        return new Ember.RSVP.Promise(function (resolve) {
            // Ember.$.ajax({ url: _this.tokenEndpoint, type: 'DELETE' }).always(function () {
            resolve();
            // })
        });
    },
});