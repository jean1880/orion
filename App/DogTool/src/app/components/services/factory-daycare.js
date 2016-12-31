'use strict';
/**
 * @class FactoryDaycare
 * @ngdoc service
 * @name dogToolApp.FactoryDaycare
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryDaycare', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Daycare dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Daycare.get(id))
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Daycare dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Daycare.getAll)
          .then(returnDataOnly);
      },

      /**
       * Listen for updates to Daycare dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Daycare.listen);
      },

      /**
       * Post new daycare to Daycare Dataset
       * @method post
       * @param daycare
       */
      post: function (daycare) {
        return $http.post(SailsRoute.Daycare.post, daycare);
      },

      /**
       * Find specific daycare from Daycare Dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Daycare.find, searchObject)
          .then(returnDataOnly);
      },

      /**
       * Update specific daycare from Daycare Dataset
       * @method update
       * @param object
       */
      update: function (object) {
        return $http.put(SailsRoute.Daycare.update(object.id), object);
      }
    };
  });
