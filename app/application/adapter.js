import DS from 'ember-data';
import config from 'hebe-dash/config/environment';

export default DS.JSONAPIAdapter.extend({

    needs: ['session'],

    host: config.APP.solomonAPIURL,

    namespace: 'api',

    headers: Ember.computed(function(){
        var headers = {};
        var token = this.get('session.secure.jwt');

        if(typeof token === 'string'){
          headers['Authorization'] = 'Bearer ' + token;
        }
        
        if(!Ember.isEmpty(config.APP.solomonClientOverride)) {
          headers['Solomon-Client-Override'] = config.APP.solomonClientOverride;
        }

        return headers;
    }).property('session.secure.jwt')

});
