(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name dogToolApp.factoryJob
   * @description
   * # factoryJob
   * Factory in the dogToolApp.
   */
  angular.module('dogToolApp')
    .factory('FactoryJob', function ($http, SailsRoute, poller) {
      return {
        /**
         * One time fetch from server for single job dataset
         * @method get
         * @param id
         */
        get: function (id) {
          return $http.get(SailsRoute.Job.get(id));
        },
        /**
         * One time fetch from server for full job dataset
         * @method getAll
         */
        getAll: function () {
          return $http.get(SailsRoute.Job.getAll);
        },
        /**
         * Wait for changes from the server
         * @method listen
         */
        listen: function () {
          return poller.get(SailsRoute.Job.listen);
        },
        /**
         * Add a new Booking with the value of cost
         * @method post
         * @param consultation
         */
        post: function (consultation) {
          return $http.post(SailsRoute.Job.post, consultation);
        },
        /**
         * One time fetch from server for full job dataset
         * @method find
         * @param searchObject
         */
        find: function (searchObject) {
          return $http.post(SailsRoute.Job.find, searchObject);
        },
        /**
         * One time fetch from server for full job dataset
         * @method update
         * @param searchObject
         */
        update: function (consultation) {
          return $http.put(SailsRoute.Job.update(consultation.id), consultation);
        },

        /**
         * Deletes the job by ID
         * @param   {string} id Target ID to destroy
         * @returns {$http.promise}
         */
        remove: function (id) {
          return $http.delete(SailsRoute.Job.delete(id));
        }
      };
    });
}());