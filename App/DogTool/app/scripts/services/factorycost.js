'use strict';
/**
 * @class FactoryCost
 * @ngdoc service
 * @name dogToolApp.FactoryCost
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryCost', function ($http, ServerAddress, poller) {
        var route = ServerAddress + '/Cost';

        return {
            /**
             * One time fetch from server for single Cost dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(route);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method listen
             */
            listen: function () {
                return poller.get(route);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method post
             * @param weight
             */
            post: function (cost) {
                return $http.post(route, cost);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(route + '/find', searchObject);
            },

            update: function (cost) {
                return $http.post(route + "/" + cost.id, cost);
            }
        };
    });
