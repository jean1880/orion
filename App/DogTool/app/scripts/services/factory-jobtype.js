'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryJobtype
 * @description
 * # factoryJobtype
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryJobType', function ($http, SailsRoute, poller) {
    return {
            /**
             * One time fetch from server for single job type dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.JobType.get(id));
            },
            /**
             * One time fetch from server for full job type dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.JobType.getAll);
            },
            /**
             * Wait for changes from the server
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.JobType.listen);
            },
            /**
             * Add a new Booking with the value of cost
             * @method post
             * @param consultation
             */
            post: function (consultation) {
                return $http.post(SailsRoute.JobType.post, consultation);
            },
            /**
             * One time fetch from server for full job type dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.JobType.find, searchObject);
            },
			/**
             * Update a job type dataset
             * @method update
             * @param searchObject
             */
            update: function (consultation) {
                return $http.post(SailsRoute.JobType.update(consultation.id), consultation);
            }
        };
  });
