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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'emguo.poller',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
  ])
  .config(function ($routeProvider, pollerConfig, flashProvider) {
    flashProvider.successClassnames.push('alert-success');
    flashProvider.infoClassnames.push('alert-info');
    flashProvider.warnClassnames.push('alert-warning');
    flashProvider.errorClassnames.push('alert-danger');

    $routeProvider
      .when('/', {
        templateUrl: 'views/dog/list.html',
        controller: 'DogListCtrl'
      })
      .when('/dog', {
        templateUrl: 'views/dog/list.html',
        controller: 'DogListCtrl'
      })
      .when('/dog/new', {
        templateUrl: 'views/dog/new.html',
        controller: 'DogNewCtrl'
      })
      .when('/dog/:id', {
        templateUrl: 'views/dog/view.html',
        controller: 'DogViewCtrl'
      })
      .when('/gridTest', {
        templateUrl: 'views/gridtest.html',
        controller: 'GridtestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // set sails server url
    pollerConfig.stopOnRouteChange = true; // If you use $routeProvider from ngRoute.
  });
