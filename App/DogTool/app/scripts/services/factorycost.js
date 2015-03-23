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
             * Fetch all entries in the dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Cost.getAll);
            },
            /**
             * Wait for changes from the server
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Cost.listen);
            },
            /**
             * Add a new item with the value of cost
             * @method post
             * @param cost
             */
            post: function (cost) {
                return $http.post(SailsRoute.Cost.post, cost);
            },
            /**
             * Find an item that matches the searchObject value
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Cost.find, searchObject);
            },
            
            /**
            * Update the value of an item, with the new value
            * @method update
            * @param cost
            */
            update: function (cost) {
                return $http.post(SailsRoute.Cost.update(cost.id), cost);
            }
        };
    });
