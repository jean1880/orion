'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryCalendar
 * @description
 * # factoryCalendar
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('factoryCalendar', function ($http, SailsRoute, poller) {
    return {
      /**
             * One time fetch from server for single Calendar dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Calendar.get(id));
            },
            /**
             * One time fetch from server for full Calendar dataset
             * @method getAll
             */
            getAll: function (type) {
                return $http.get(SailsRoute.Calendar.getAll);
            },
            /**
             * Wait for changes from the server
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Calendar.listen);
            },
            /**
             * Add a new Booking with the value of cost
             * @method post
             * @param consultation
             */
            post: function (consultation) {
                return $http.post(SailsRoute.Calendar.post, consultation);
            },
            /**
             * One time fetch from server for full Calendar dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Calendar.find, searchObject);
            },
            /**
             * One time fetch from server for full Calendar dataset
             * @method update
             * @param searchObject
             */
            update: function (consultation) {
                return $http.post(SailsRoute.Calendar.update(consultation.id), consultation);
            }
    };
  });
