/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * Load our packagone.json file
         */
        pkg: grunt.file.readJSON('package.json'),

        /*
            Run the Ember shell commands from the respective grunt commands
        */
        shell: {
            serve: {
                command: 'ember serve & grunt watch:grunticon'
            },
            build: {
                command: 'ember build --environment production'
            }
        },

        /*
            Watch for generated grunticon css
        */
        watch: {
            grunticon: {
                files: 'public/assets/img/svg/embed/*.svg',
                //files: '/vendor/embedsvg/**/*.hbs',
                tasks: ['svg']
            }
        },
        /*
            Move generated grunticon css to public/assets
        */
        copy: {
            grunticon: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'vendor/embedsvg/',
                        dest: 'public/assets/css/',
                        src: [
                            '*.css',
                            'png/*'
                        ]
                    }
                ]
            }
        },

        /*
            Clean the grunticon public images folder to remove any newly deleted assets
        */
        clean: {
            grunticon: {
                files: [{
                    src: [
                        'vendor/embedsvg/png/*',
                        'public/assets/css/png/*'
                    ]
                }]
            }
        },


        /**
         * Create data URIs in a CSS file for SVGs
         */
        grunticon: {
            nonembedsvg: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/img/svg/datauri',
                    src: '*.svg',
                    dest: 'public/assets/img/svg'
                }],
                options: {
                    datasvgcss: '../../../../app/styles/patterns/_svg-datauri.scss',
                    cssprefix: '@mixin svg--'
                }
            },
            embed: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/img/svg/embed',
                    src: '*.svg',
                    dest: 'vendor/embedsvg'
                }],
                options: {
                    enhanceSVG: true,
                    cssprefix: '.svg-'
                }
            }
        },

        /**
         * Detect which parts of Modernizr are required & build a custom Modernizr file
         */
        modernizr: {

            dist: {
                "devFile" : "bower_components/modernizr/modernizr.js",
                "outputFile" : "vendor/modernizr-custom.min.js",
                "uglify" : true,
                "files" : {
                    "src": ['app/index.html']
                },
            }

        }
    });

    /**
     * Generates a list of grunt tasks
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Define a workflow of tasks that will be run on deployment
     */

    grunt.registerTask('svg', ['clean:grunticon', 'grunticon:embed', 'grunticon:nonembedsvg', 'copy:grunticon']);
    grunt.registerTask('default', ['svg', 'shell:build']);
    grunt.registerTask('serve', ['svg', 'shell:serve']);
};
