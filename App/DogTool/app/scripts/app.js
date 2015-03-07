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
    'ui.bootstrap.showErrors'
  ])
  .config(function ($routeProvider, pollerConfig) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dog/list.html',
        controller: 'DogCtrl'
      })
      .when('/dog', {
        templateUrl: 'views/dog/list.html',
        controller: 'DogCtrl'
      })
      .when('/dog/:id', {
        templateUrl: 'views/dog/view.html',
        controller: 'DogCtrl'
      })
      .when('/dog/:id/edit', {
        templateUrl: 'views/dog/edit.html',
        controller: 'DogCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // set sails server url
    pollerConfig.stopOnStateChange = true; // If you use $stateProvider from ui-router.
    pollerConfig.stopOnRouteChange = true; // If you use $routeProvider from ngRoute.
  });
