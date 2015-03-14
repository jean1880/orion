'use strict';
/**
 * @class FactoryDaycare
 * @ngdoc service
 * @name dogToolApp.FactoryDaycare
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryDaycare', function ($http, SailsRoute, poller) {
        

        return {
            /**
             * One time fetch from server for single Daycare dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Daycare.get(id));
            },
            /**
             * One time fetch from server for full Daycare dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Daycare.route);
            },
            /**
             * Listen for updates to Daycare dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Daycare.route);
            },
            /**
             * Post new daycare to Daycare Dataset
             * @method post
             * @param daycare
             */
            post: function (daycare) {
                return $http.post(SailsRoute.Daycare.route, daycare);
            },
            /**
             * Find specific daycare from Daycare Dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Daycare.find, searchObject);
            },

			/**
             * Update specific daycare from Daycare Dataset
             * @method update
             * @param object
             */
            update: function (object) {
                return $http.post(SailsRoute.Daycare.get(object.id), object);
            }
        };
    });
