(function () {
    'use strict';

    angular
        .module('dogToolApp')
        .config(function ($stateProvider, $locationProvider, pollerConfig, flashProvider, jwtInterceptorProvider, $httpProvider, $localStorageProvider, $urlRouterProvider, $qProvider) {
            $localStorageProvider.setKeyPrefix('NotJustKibble');
            $locationProvider.html5Mode({
              enabled: true
            });
            $qProvider.errorOnUnhandledRejections(false);
            flashProvider.successClassnames.push('alert-success');
            flashProvider.infoClassnames.push('alert-info');
            flashProvider.warnClassnames.push('alert-warning');
            flashProvider.errorClassnames.push('alert-danger');

            $stateProvider
                .state('dogs', {
                    url: '/dogs',
                    templateUrl: '/app/Dog/dog-list/list.html',
                    controller: 'DogListCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('dogs_new', {
                    url: '/dog/new',
                    templateUrl: '/app/Dog/dog-new/new.html',
                    controller: 'DogNewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('dog_detail', {
                    url: '/dog/:id',
                    templateUrl: '/app/Dog/dog-view/view.html',
                    controller: 'DogViewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('jobs', {
                    url: '/jobs',
                    templateUrl: '/app/Booking/List/job-list.html',
                    controller: 'JobsCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('jobs_day', {
                    url: '/jobs/day/:date',
                    templateUrl: '/app/Booking/List/job-list.html',
                    controller: 'JobsCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('jobs_new', {
                    url: '/jobs/new',
                    templateUrl: '/app/Booking/New/job-new.html',
                    controller: 'NewJobsCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('jobs_detail', {
                    url: '/jobs/:id',
                    templateUrl: '/app/Booking/New/job-new.html',
                    controller: 'JobsEditCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('jobs_new_specific', {
                    url: '/jobs/new/:startDate/:endDate',
                    templateUrl: '/app/Booking/New/job-new.html',
                    controller: 'NewJobsCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('people', {
                    url: '/people',
                    templateUrl: '/app/People/People-List/list.html',
                    controller: 'PeopleListCtrl'
                })
                .state('person', {
                    url: '/person/new',
                    templateUrl: '/app/People/People-New/new.html',
                    controller: 'PeopleNewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('person_detail', {
                    url: '/person/:id',
                    templateUrl: '/app/People/People-View/view.html',
                    controller: 'PeopleViewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('calendar', {
                    url: '/calendar',
                    templateUrl: '/app/Calendar/view.html',
                    controller: 'CalendarCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('quote', {
                    url: '/quote',
                    templateUrl: '/app/views/quote.html',
                    controller: 'QuoteCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('homework', {
                    url: '/homework',
                    templateUrl: '/app/homework/homework.html',
                    controller: 'HomeworkNewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('homework_new', {
                    url: '/homework/new/?id',
                    templateUrl: '/app/homework/homework.html',
                    controller: 'HomeworkNewCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('homework_detail', {
                    url: '/homework/:id',
                    templateUrl: '/app/homework/homework.html',
                    controller: 'HomeworkCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('businessInfo', {
                    url: '/businessInfo',
                    templateUrl: '/app/views/businessinfo.html',
                    controller: 'BusinessinfoCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('library', {
                    url: '/library',
                    templateUrl: '/app/homework/homeworkManagement.html',
                    controller: 'HomeworkMngCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('library_dog', {
                    url: '/library/:dog',
                    templateUrl: '/app/homework/homeworkManagement.html',
                    controller: 'HomeworkMngCtrl',
                    resolve: {
                      user: authenticate
                    }
                })
                .state('invoice', {
                    url: '/invoice/:id',
                    templateUrl: '/app/views/invoice.html',
                    controller: 'InvoiceCtrl',
                    controllerAs: 'invoice',
                    resolve: {
                      user: authenticate
                    }
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

            function authenticate(FactoryAuthToken, FactoryLogin, $localStorage, $state, $q){
              if(!FactoryAuthToken.getToken()){
                return $q(function(resolve){
                    FactoryLogin.validate()
                        .then(function (res) {
                            if (res.valid) {
                                resolve();
                            } else {
                                FactoryLogin.login()
                                    .then(function () {
                                        resolve();
                                    });
                            }
                        })
                       .catch(function (err) {
                         reject(err);
                       });
                  });
                }
              return true;
            }
        });
}());
