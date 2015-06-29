// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-02-11 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-poller/angular-poller.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-bootstrap-show-errors/src/showErrors.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-flash/dist/angular-flash.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/matchmedia/matchMedia.js',
      'bower_components/ngSticky/lib/sticky.js',
<<<<<<< HEAD
=======
      'bower_components/fullcalendar/dist/fullcalendar.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/angular-jwt/dist/angular-jwt.js',
      'bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.js',
      'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
      'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
>>>>>>> origin/develop
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/chance/chance.js',
      // endbower
      'app/views/**/*.html',
      'app/scripts/**/*.js',
      'test/config.js',
      'test/mocks/Mockery.js',
      'test/mocks/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-jasmine-matchers',
      'karma-nested-reporter'
    ],

    preprocessors: {

      'app/views/**/*.html': ['ng-html2js'],
      'app/**/*.js': 'coverage'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'htmlFiles'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: [
      'nested',
      'coverage'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
