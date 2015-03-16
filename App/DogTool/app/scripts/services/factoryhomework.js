'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.FactoryHomework
 * @description
 * # FactoryHomework
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryHomework', function ($http, ServerAddress, poller) {
        var route = ServerAddress + '/Homework';
        return {
            /**
             * One time fetch from server for single Homework dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Homework dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(route);
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method listen
             */
            listen: function () {
                return poller.get(route);
            },
            /**
             * One time fetch from server for full Homework dataset
             * @method post
             * @param weight
             */
            post: function (Homework) {
                return $http.post(route, Homework);
            },
            /**
             * One time fetch from server for full Homework dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(route + '/find', searchObject);
            },

            update: function (object) {
                return $http.post(route + "/" + dog.id, dog);
            }
        };
    });