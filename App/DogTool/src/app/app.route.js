(function () {
  'use strict';

  angular
    .module('dogToolApp')
    .config(function ($routeProvider, pollerConfig, flashProvider, jwtInterceptorProvider, $httpProvider) {
      flashProvider.successClassnames.push('alert-success');
      flashProvider.infoClassnames.push('alert-info');
      flashProvider.warnClassnames.push('alert-warning');
      flashProvider.errorClassnames.push('alert-danger');

      $routeProvider
        .when('/', {
          templateUrl: 'app/Dog/dog-list/list.html',
          controller: 'DogListCtrl',
          title: 'Dog'
        })
        .when('/working', {
          template: '<h1>Working...</h1>'
        })
        .when('/dogs', {
          templateUrl: 'app/Dog/dog-list/list.html',
          controller: 'DogListCtrl'
        })
        .when('/dog/new', {
          templateUrl: 'app/Dog/dog-new/new.html',
          controller: 'DogNewCtrl'
        })
        .when('/dog/:id', {
          templateUrl: 'app/Dog/dog-view/view.html',
          controller: 'DogViewCtrl'
        }).when('/jobs', {
          templateUrl: 'app/Booking/List/job-list.html',
          controller: 'JobsCtrl'
        })
        .when('/jobs/day/:date', {
          templateUrl: 'app/Booking/List/job-list.html',
          controller: 'JobsCtrl'
        })
        .when('/jobs/new', {
          templateUrl: 'app/Booking/New/job-new.html',
          controller: 'NewJobsCtrl'
        })
        .when('/jobs/new/:startDate/:endDate', {
          templateUrl: 'app/Booking/New/job-new.html',
          controller: 'NewJobsCtrl'
        })
        .when('/jobs/new/:startDate/:endDate/:allDay', {
          templateUrl: 'app/Booking/New/job-new.html',
          controller: 'NewJobsCtrl'
        })
        .when('/jobs/:id', {
          templateUrl: 'app/Booking/New/job-new.html',
          controller: 'JobsEditCtrl'
        })
        .when('/people', {
          templateUrl: 'app/People/People-List/list.html',
          controller: 'PeopleListCtrl'
        })
        .when('/person/new', {
          templateUrl: 'app/People/People-New/new.html',
          controller: 'PeopleNewCtrl'
        })
        .when('/person/:id', {
          templateUrl: 'app/People/People-View/view.html',
          controller: 'PeopleViewCtrl'
        })
        .when('/Tester', {
          templateUrl: 'app/views/tester.html',
          controller: 'TesterCtrl'
        })
        .when('/gridTest', {
          templateUrl: 'app/views/gridtest.html',
          controller: 'GridtestCtrl'
        })
        .when('/calendar', {
          templateUrl: 'app/Calendar/view.html',
          controller: 'CalendarCtrl'
        })
        .when('/quote', {
          templateUrl: 'app/views/quote.html',
          controller: 'QuoteCtrl'
        })
        .when('/homework', {
          redirectTo: '/homework/new'
        })
        .when('/homework/new', {
          templateUrl: 'app/homework/homework.html',
          controller: 'HomeworkNewCtrl'
        })
        .when('/homework/:id', {
          templateUrl: 'app/homework/homework.html',
          controller: 'HomeworkCtrl'
        })
        .when('/businessInfo', {
          templateUrl: 'app/views/businessinfo.html',
          controller: 'BusinessinfoCtrl'
        })
        .when('/homework/new/:id', {
          templateUrl: 'app/homework/homework.html',
          controller: 'HomeworkNewCtrl'
        })
        .when('/library', {
          templateUrl: 'app/homework/homeworkManagement.html',
          controller: 'HomeworkMngCtrl'
        })
        .when('/library/:dog', {
          templateUrl: 'app/homework/homeworkManagement.html',
          controller: 'HomeworkMngCtrl'
        })
        .when('/invoice/:id', {
          templateUrl: 'app/views/invoice.html',
          controller: 'InvoiceCtrl',
          controllerAs: 'invoice'
        })
        .when('/quote', {
          templateUrl: 'app/views/quote.html',
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
    });
}());