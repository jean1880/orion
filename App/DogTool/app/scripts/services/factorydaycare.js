'use strict';
/**
 * @class FactoryDaycare
 * @ngdoc service
 * @name dogToolApp.FactoryDaycare
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryDaycare', function ($http, ServerAddress, poller) {
        var route = ServerAddress + '/Daycare';

        return {
            /**
             * One time fetch from server for single Daycare dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Daycare dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(route);
            },
            /**
             * One time fetch from server for full Daycare dataset
             * @method listen
             */
            listen: function () {
                return poller.get(route);
            },
            /**
             * One time fetch from server for full Daycare dataset
             * @method post
             * @param daycare
             */
            post: function (daycare) {
                return $http.post(route, daycare);
            },
            /**
             * One time fetch from server for full Daycare dataset
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
