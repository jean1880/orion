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
    'angular-flash.flash-alert-directive',
    'ngFileUpload',
    'sticky'
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
      .when('/dogs', {
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
      .when('/jobs', {
        templateUrl: 'views/job-list.html',
        controller: 'JobsCtrl'
      })
      .when('/people', {
        templateUrl: 'views/people/list.html',
        controller: 'PeopleListCtrl'
      })
      .when('/person/new', {
        templateUrl: 'views/people/new.html',
        controller: 'PeopleNewCtrl'
      })
      .when('/person/:id', {
        templateUrl: 'views/people/view.html',
        controller: 'PeopleViewCtrl'
      })
      .when('/jobs/new', {
        templateUrl: 'views/job-new.html',
        controller: 'NewJobsCtrl'
      })
      .when('/jobs/:id', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl'
      })
      .when('/people/new', {
        templateUrl: 'views/people/new.html',
        controller: 'PeopleNewCtrl'
      })
      .when('/people/:id', {
        templateUrl: 'views/people/view.html',
        controller: 'PeopleViewCtrl'
      })
      .when('/Tester', {
        templateUrl: 'views/tester.html',
        controller: 'TesterCtrl'
      })
      .when('/gridTest', {
        templateUrl: 'views/gridtest.html',
        controller: 'GridtestCtrl'
      })
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl'
      })
      .when('/quote', {
        templateUrl: 'views/quote.html',
        controller: 'QuoteCtrl'
      })
      .when('/homework', {
        redirectTo: '/homework/new'
      })
      .when('/homework/new', {
        templateUrl: 'views/homework-new.html',
        controller: 'HomeworkNewCtrl'
      })
      .when('/homework/:id', {
        templateUrl: 'views/homework.html',
        controller: 'HomeworkCtrl'
      })
      .when('/calendar', {
        templateUrl: 'views/calendar/view.html'
      })
      .when('/business-info', {
        templateUrl: 'views/business-info.html',
        controller: 'BusinessInfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // set sails server url
    pollerConfig.stopOnRouteChange = true; // If you use $routeProvider from ngRoute.
  });
