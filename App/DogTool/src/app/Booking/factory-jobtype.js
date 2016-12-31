'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryJobtype
 * @description
 * # factoryJobtype
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryJobType', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
            /**
             * One time fetch from server for single job type dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.JobType.get(id))
                  .then(returnDataOnly);
            },
            /**
             * One time fetch from server for full job type dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.JobType.getAll)
                  .then(returnDataOnly);
            },
            /**
             * Wait for changes from the server
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.JobType.listen)
                  .then(returnDataOnly);
            },
            /**
             * Add a new Booking with the value of cost
             * @method post
             * @param jobType
             */
            post: function (jobType) {
                return $http.post(SailsRoute.JobType.post, jobType)
                  .then(returnDataOnly);
            },
            /**
             * One time fetch from server for full job type dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.JobType.find, searchObject)
                  .then(returnDataOnly);
            },
			/**
             * Update a job type dataset
             * @method update
             * @param searchObject
             */
            update: function (jobType) {
                return $http.put(SailsRoute.JobType.update(jobType.id), jobType);
            }
        };
  });
