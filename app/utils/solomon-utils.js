/* global hebeutils */
export default Ember.Object.extend({
      config: function (hostname) {
            var solomonConfig = {};
            switch (hostname) {
                  default:
                        solomonConfig.name = 'solomon';
                        solomonConfig.title = 'Solomon';
                        break;
                  case 'leeds.testing.mysolomon.co.uk':
                  case 'leeds.preview.mysolomon.co.uk':
                  case 'leeds.mysolomon.co.uk':
                  case 'dashboard.leedsdatamill.org':
                        solomonConfig.name = 'lcd';
                        solomonConfig.title = 'Leeds City Dashboard';
                        break;
            }
            return solomonConfig;
      },

      encodeQuery: function (query) {
            var json = JSON.stringify(query);
            var base64 = hebeutils.Base64.encode(json);
            return base64;
      },
});
