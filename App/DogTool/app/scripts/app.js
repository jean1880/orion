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
    'ui.calendar',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'ngFileUpload',
    'sticky',
    'angularMoment',
    'angular-jwt',
    'sticky',
    'ui.bootstrap.datetimepicker',
    'frapontillo.bootstrap-switch'
  ])
  .config(function ($routeProvider, pollerConfig, flashProvider, jwtInterceptorProvider, $httpProvider) {
    flashProvider.successClassnames.push('alert-success');
    flashProvider.infoClassnames.push('alert-info');
    flashProvider.warnClassnames.push('alert-warning');
    flashProvider.errorClassnames.push('alert-danger');

    $routeProvider
      .when('/', {
        templateUrl: 'views/dog/list.html',
        controller: 'DogListCtrl',
        title: 'Dog'
      })
      .when('/working', {
        template: '<h1>Working...</h1>'
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
      .when('/jobs', {
        templateUrl: 'views/job/job-list.html',
        controller: 'JobsCtrl'
      })
      .when('/jobs/day/:date', {
        templateUrl: 'views/job/job-list.html',
        controller: 'JobsCtrl'
      })
      .when('/jobs/new', {
        templateUrl: 'views/job/job-new.html',
        controller: 'NewJobsCtrl'
      })
      .when('/jobs/new/:startDate/:endDate', {
        templateUrl: 'views/job/job-new.html',
        controller: 'NewJobsCtrl'
      })
      .when('/jobs/:id', {
        templateUrl: 'views/job/job-new.html',
        controller: 'JobsEditCtrl'
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
        templateUrl: 'views/calendar/view.html',
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
        templateUrl: 'views/homework.html',
        controller: 'HomeworkNewCtrl'
      })
      .when('/homework/:id', {
        templateUrl: 'views/homework.html',
        controller: 'HomeworkCtrl'
      })
      .when('/businessInfo', {
        templateUrl: 'views/businessinfo.html',
        controller: 'BusinessinfoCtrl'
      })
      .when('/library', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl'
      })

      .when('/invoice/:id', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl',
        controllerAs: 'invoice'
      })
      .otherwise({
        redirectTo: '/'
      });
    // set sails server url
    pollerConfig.stopOnRouteChange = true; // If you use $routeProvider from ngRoute.

    // authentication settings
    jwtInterceptorProvider.authHeader = 'Token';
    jwtInterceptorProvider.authPrefix = '';
    jwtInterceptorProvider.tokenGetter = ['FactoryAuthToken', function (FactoryAuthToken) {
      return FactoryAuthToken.getToken();
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function ($location, FactoryLogin, amMoment) {
    var url = $location.url();
    $location.url('/working');

    FactoryLogin.validate()
      .success(function (res) {
        if (res.valid) {
          $location.url(url);
        } else {
          FactoryLogin.login()
            .success(function () {
              $location.url(url);
            });
        }
      });
  });