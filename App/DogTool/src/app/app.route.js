(function () {
    'use strict';

    angular
        .module('dogToolApp')
        .config(function ($stateProvider, pollerConfig, flashProvider, jwtInterceptorProvider, $httpProvider, $localStorageProvider, $urlRouterProvider) {
            $localStorageProvider.setKeyPrefix('NotJustKibble');
            flashProvider.successClassnames.push('alert-success');
            flashProvider.infoClassnames.push('alert-info');
            flashProvider.warnClassnames.push('alert-warning');
            flashProvider.errorClassnames.push('alert-danger');

            $stateProvider
                .state('dogs', {
                    url: '/dogs',
                    templateUrl: 'app/Dog/dog-list/list.html',
                    controller: 'DogListCtrl'
                })
                .state('dogs_new', {
                    url: '/dog/new',
                    templateUrl: 'app/Dog/dog-new/new.html',
                    controller: 'DogNewCtrl'
                })
                .state('working', {
                    url: '/working',
                    template: '<h1>Working...</h1>'
                })
                .state('dog_detail', {
                    url: '/dog/:id',
                    templateUrl: 'app/Dog/dog-view/view.html',
                    controller: 'DogViewCtrl'
                })
                .state('jobs', {
                    url: '/jobs',
                    templateUrl: 'app/Booking/List/job-list.html',
                    controller: 'JobsCtrl'
                })
                .state('jobs_day', {
                    url: '/jobs/day/:date',
                    templateUrl: 'app/Booking/List/job-list.html',
                    controller: 'JobsCtrl'
                })
                .state('jobs_new', {
                    url: '/jobs/new',
                    templateUrl: 'app/Booking/New/job-new.html',
                    controller: 'NewJobsCtrl'
                })
                .state('jobs_detail', {
                    url: '/jobs/:id',
                    templateUrl: 'app/Booking/New/job-new.html',
                    controller: 'JobsEditCtrl'
                })
                .state('jobs_new_specific', {
                    url: '/jobs/:startDate/:endDate',
                    templateUrl: 'app/Booking/New/job-new.html',
                    controller: 'NewJobsCtrl'
                })
                .state('people', {
                    url: '/people',
                    templateUrl: 'app/People/People-List/list.html',
                    controller: 'PeopleListCtrl'
                })
                .state('person', {
                    url: '/person/new',
                    templateUrl: 'app/People/People-New/new.html',
                    controller: 'PeopleNewCtrl'
                })
                .state('person_detail', {
                    url: '/person/:id',
                    templateUrl: 'app/People/People-View/view.html',
                    controller: 'PeopleViewCtrl'
                })
                .state('calendar', {
                    url: '/calendar',
                    templateUrl: 'app/Calendar/view.html',
                    controller: 'CalendarCtrl'
                })
                .state('quote', {
                    url: '/quote',
                    templateUrl: 'app/views/quote.html',
                    controller: 'QuoteCtrl'
                })
                .state('homework', {
                    url: '/homework',
                    templateUrl: 'app/homework/homework.html',
                    controller: 'HomeworkNewCtrl'
                })
                .state('homework_new', {
                    url: '/homework/new/?id',
                    templateUrl: 'app/homework/homework.html',
                    controller: 'HomeworkNewCtrl'
                })
                .state('homework_detail', {
                    url: '/homework/:id',
                    templateUrl: 'app/homework/homework.html',
                    controller: 'HomeworkCtrl'
                })
                .state('businessInfo', {
                    url: '/businessInfo',
                    templateUrl: 'app/views/businessinfo.html',
                    controller: 'BusinessinfoCtrl'
                })
                .state('library', {
                    url: '/library',
                    templateUrl: 'app/homework/homeworkManagement.html',
                    controller: 'HomeworkMngCtrl'
                })
                .state('library_dog', {
                    url: '/library/:dog',
                    templateUrl: 'app/homework/homeworkManagement.html',
                    controller: 'HomeworkMngCtrl'
                })
                .state('invoice', {
                    url: '/invoice/:id',
                    templateUrl: 'app/views/invoice.html',
                    controller: 'InvoiceCtrl',
                    controllerAs: 'invoice'
                });
            $urlRouterProvider.otherwise('/dogs');
            // set sails server url
            pollerConfig.stopOnRouteChange = true; // If you use $routeProvider from ngRoute.

            // authentication settings
            jwtInterceptorProvider.authHeader = 'Token';
            jwtInterceptorProvider.authPrefix = '';
            jwtInterceptorProvider.tokenGetter = ['FactoryAuthToken', function (FactoryAuthToken) {
                return FactoryAuthToken.getToken();
    }];

            $httpProvider.interceptors.push('jwtInterceptor');
            $httpProvider.defaults.headers.common.Accept = 'application/json, text/plain, */*';
        });
}());