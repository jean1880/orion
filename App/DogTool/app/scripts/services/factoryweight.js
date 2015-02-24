'use strict';
/**
 * @class FactoryWeight
 * @ngdoc service
 * @author Stephen A. Wilson
 * @name dogToolApp.FactoryWeight
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryWeight', function ($http, ServerAddress, poller) {
        var route = ServerAddress + '/Weight';

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
            }
        };
    });