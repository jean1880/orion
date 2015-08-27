(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name dogToolApp
   * @description
   * @class dogToolApp
   *
   * Main module of the application.
   */
  angular
    .module('dogToolApp', [
    'angular-flash.flash-alert-directive',
    'angular-flash.service',
    'angular-jwt',
    'angularMoment',
    'emguo.poller',
    'frapontillo.bootstrap-switch',
    'ngAnimate',
    'ngCookies',
    'ngFileUpload',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'sticky',
    'truncate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'ui.bootstrap.showErrors',
    'ui.calendar'
  ]);
}());