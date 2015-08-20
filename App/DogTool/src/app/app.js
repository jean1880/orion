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
  ])
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
            .when('/jobs', {
                templateUrl: 'app/views/job/job-list.html',
                controller: 'JobsCtrl'
            })
            .when('/jobs/day/:date', {
                templateUrl: 'app/views/job/job-list.html',
                controller: 'JobsCtrl'
            })
            .when('/jobs/new', {
                templateUrl: 'app/views/job/job-new.html',
                controller: 'NewJobsCtrl'
            })
            .when('/jobs/new/:startDate/:endDate', {
                templateUrl: 'app/views/job/job-new.html',
                controller: 'NewJobsCtrl'
            })
            .when('/jobs/new/:startDate/:endDate/:allDay', {
                templateUrl: 'app/views/job/job-new.html',
                controller: 'NewJobsCtrl'
            })
            .when('/jobs/:id', {
                templateUrl: 'app/views/job/job-new.html',
                controller: 'JobsEditCtrl'
            })
            .when('/people/new', {
                templateUrl: 'app/views/people/new.html',
                controller: 'PeopleNewCtrl'
            })
            .when('/people/:id', {
                templateUrl: 'app/views/people/view.html',
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
                templateUrl: 'app/views/homework.html',
                controller: 'HomeworkNewCtrl'
            })
            .when('/homework/:id', {
                templateUrl: 'app/views/homework.html',
                controller: 'HomeworkCtrl'
            })
            .when('/businessInfo', {
                templateUrl: 'app/views/businessinfo.html',
                controller: 'BusinessinfoCtrl'
            })
            .when('/homework/new/:id', {
                templateUrl: 'app/views/homework.html',
                controller: 'HomeworkNewCtrl'
            })
            .when('/library', {
                templateUrl: 'app/views/homeworkManagement.html',
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