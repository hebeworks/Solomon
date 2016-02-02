import DS from 'ember-data';
import config from 'hebe-dash/config/environment';

export default DS.JSONAPIAdapter.extend({

    needs: ['session'],

    host: config.APP.solomonAPIURL,

    namespace: 'api',

    headers: Ember.computed('session.secure.jwt', function(){
        var headers = {};
        var token = this.get('session.secure.jwt');

        if(typeof token === 'string'){
          headers['Authorization'] = 'Bearer ' + token;
        }

        return headers;
    })

});
