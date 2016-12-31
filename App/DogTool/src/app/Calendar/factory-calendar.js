(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name dogToolApp.factoryCalendar
   * @description
   * # factoryCalendar
   * Factory in the dogToolApp.
   */
  angular.module('dogToolApp')
    .factory('factoryCalendar', function ($http, SailsRoute, poller, $localStorage, returnDataOnly) {
      return {
        /**
         * One time fetch from server for single Calendar dataset
         * @method get
         * @param id
         */
        get: function (id) {
          return $http.get(SailsRoute.Calendar.get(id))
            .then(returnDataOnly);
        },
        /**
         * One time fetch from server for full Calendar dataset
         * @method getAll
         */
        getAll: function (type) {
          return $http.get(SailsRoute.Calendar.getAll)
            .then(returnDataOnly);
        },
        /**
         * Wait for changes from the server
         * @method listen
         */
        listen: function () {
          return poller.get(SailsRoute.Calendar.listen)
            .then(returnDataOnly);
        },
        /**
         * Add a new Booking with the value of cost
         * @method post
         * @param consultation
         */
        post: function (consultation) {
          return $http.post(SailsRoute.Calendar.post, consultation)
            .then(returnDataOnly);
        },
        /**
         * One time fetch from server for full Calendar dataset
         * @method find
         * @param searchObject
         */
        find: function (searchObject) {
          return $http.post(SailsRoute.Calendar.find, searchObject)
            .then(returnDataOnly);
        },
        /**
         * One time fetch from server for full Calendar dataset
         * @method update
         * @param searchObject
         */
        update: function (calendar) {
          return $http.put(SailsRoute.Calendar.update(calendar.id), calendar)
            .then(returnDataOnly);
        },

        /**
         * Deletes the job by ID
         * @param   {string} id Target ID to destroy
         * @returns {$http.promise}
         */
        remove: function (id) {
          delete _.find($localStorage.calendarData, function (item) {
            return item.id === id;
          });
          return $http.delete(SailsRoute.Calendar.delete(id));
        }
      };
    });
}());
