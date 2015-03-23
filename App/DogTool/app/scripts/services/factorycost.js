'use strict';
/**
 * @class FactoryCost
 * @ngdoc service
 * @name dogToolApp.FactoryCost
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryCost', function ($http, SailsRoute, poller) {
        

        return {
            /**
             * One time fetch from server for single Cost dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Cost.get(id));
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Cost.getAll);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Cost.listen);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method post
             * @param weight
             */
            post: function (cost) {
                return $http.post(SailsRoute.Cost.post, cost);
            },
            /**
             * One time fetch from server for full Cost dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Cost.find, searchObject);
            },

            update: function (cost) {
                return $http.post(SailsRoute.Cost.update(cost.id), cost);
            }
        };
    });
