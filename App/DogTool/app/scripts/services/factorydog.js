'use strict';
/**
 * @class FactoryDog
 * @ngdoc service
 * @name dogToolApp.FactoryDo
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryDog', function ($http, ServerAddress, poller) {
        var route = ServerAddress + '/Dog';

        return {
            /**
             * One time fetch from server for single Weight dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Weight dataset
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
             * One time fetch from server for full Weight dataset
             * @method post
             * @param weight
             */
            post: function (weight) {
                return $http.post(route, weight);
            },
            /**
             * One time fetch from server for full Weight dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(route + '/find', searchObject);
            },

            update: function (object) {
                return $http.post(route + "/" + object.id, object);
            }
        };
    });