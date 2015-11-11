export default {
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
      }
}
