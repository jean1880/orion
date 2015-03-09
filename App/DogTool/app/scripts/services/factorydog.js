'use strict';
/**
 * @class FactoryDog
 * @ngdoc service
 * @name dogToolApp.FactoryDo
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryDog', function ($http, SailsRoute, poller) {
        return {
            /**
             * One time fetch from server for single Weight dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Dog.get(id));
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Dog.route);
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Dog.route);
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method post
             * @param weight
             */
            post: function (dog) {
                return $http.post(SailsRoute.Dog.route, dog);
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Dog.find, searchObject);
            },

            update: function (dog) {
                return $http.post(SailsRoute.Dog.get(dog.id), dog);
            }
        };
    });
