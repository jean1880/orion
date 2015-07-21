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
    'ui.calendar',
    'filters'
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
      .when('/homework/new/:id', {
        templateUrl: 'views/homework.html',
        controller: 'HomeworkNewCtrl'
      })
      .when('/library', {
        templateUrl: 'views/homeworkManagement.html',
        controller: 'HomeworkMngCtrl'
      })
      .when('/invoice/:id', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl',
        controllerAs: 'invoice'
      })
      .when('/quote', {
        templateUrl: 'views/quote.html',
        controller: 'QuoteCtrl'
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

/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
angular.module('filters', []).
    filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    });
