/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'hebe-dash',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      dataMillUrl: 'http://api.leedsdatamill.org/',
      statnoticeURL: 'http://statnotices-preview.azurewebsites.net', // PREVIEW 
      // dashAPIURL: 'http://localhost:8080',
      dashAPIURL: 'http://hebedashapi.azurewebsites.net',
      // statnoticeURL: 'http://statnotices.azurewebsites.net', // LIVE 
      googleMapStyles: {
        default: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#0c0b0b"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#090909"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#d4e4eb"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "color": "#fef7f7"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9b7f7f"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#fef7f7"
              }
            ]
          }
        ]
      }

    }
  };

  ENV['simple-auth'] = {
    // authorizer: 'simple-auth-authorizer:oauth2-bearer'
    // authorizer: 'simple-auth-authorizer:unique-token',
    authorizer: 'authorizer:unique',
    authenticator: 'authenticator:unique',
    store: 'simple-auth-session-store:local-storage'
  };

  // ENV['torii'] = {
  //   providers: {
  //     'facebook-oauth2': {
  //       apiKey: '631252926924840'
  //     },
  //     'unique': {

  //     }
  //   }
  // };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy'
    // ENV.APP.statnoticeURL = 'http://localhost:8080'; // DEV
    // ENV.APP.statnoticeURL =  'http://statnotices-preview.azurewebsites.net'; // PREVIEW 

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
