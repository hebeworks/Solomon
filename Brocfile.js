/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
    outputPaths: {
        app: {
            css: {
                'app': '/assets/hebe-dash.css'
            }
        }
    },
    fingerprint: {
        exclude: ['assets/img/tutorial-intro-assets']
    }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import(app.bowerDirectory + '/hebe-utils/dist/hebe-utils.js');
app.import(app.bowerDirectory + '/packery/dist/packery.pkgd.min.js');
app.import(app.bowerDirectory + '/jquery-ui/ui/core.js');
app.import(app.bowerDirectory + '/jquery-ui/ui/widget.js');
app.import(app.bowerDirectory + '/jquery-ui/ui/mouse.js');
app.import(app.bowerDirectory + '/jquery-ui/ui/draggable.js');
app.import('vendor/css-style-declaration.js');
app.import(app.bowerDirectory + '/jqueryui-touch-punch/jquery.ui.touch-punch.min.js');
app.import(app.bowerDirectory + '/jquery-touchswipe/jquery.touchSwipe.min.js');
app.import(app.bowerDirectory + '/caroufredsel/jquery.carouFredSel-6.2.1-packed.js');
app.import(app.bowerDirectory + '/loadcss/loadCSS.js');
app.import(app.bowerDirectory + '/moment/moment.js');
app.import(app.bowerDirectory + '/chartist/dist/chartist.min.js');
app.import(app.bowerDirectory + '/chartist/dist/chartist.min.css');
app.import(app.bowerDirectory + '/d3/d3.js');
app.import(app.bowerDirectory + '/c3/c3.js');
app.import(app.bowerDirectory + '/c3/c3.css');
app.import(app.bowerDirectory + '/underscore/underscore-min.js');
app.import('vendor/embedsvg/grunticon.loader.js');
app.import('vendor/embedsvg/grunticon.inline.js');
app.import('vendor/modernizr-custom.min.js');
app.import(app.bowerDirectory + '/jQuery.XDomainRequest/jquery.xdomainrequest.min.js');
app.import(app.bowerDirectory + '/js-cookie/src/js.cookie.js');

module.exports = app.toTree();