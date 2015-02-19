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
    'ngSails'
  ])
    .config(function ($routeProvider, $sailsProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        // set sails server url
        $sailsProvider.url = 'http://localhost:1337';
    });