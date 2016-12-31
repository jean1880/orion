'use strict';
/**
 * @class FactoryWeight
 * @ngdoc service
 * @author Stephen A. Wilson
 * @name dogToolApp.FactoryWeight
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryWeight', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Weight dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Weight.get(id))
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Weight dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Weight.getAll)
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Weight dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Weight.listen);
      },

      /**
       * One time fetch from server for full Weight dataset
       * @method post
       * @param weight
       */
      post: function (weight) {
        return $http.post(SailsRoute.Weight.post, weight);
      },

      /**
       * One time fetch from server for full Weight dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Weight.find, searchObject)
          .then(returnDataOnly);
      },

      /**
       * Updates a weight
       * @method update
       * @param weight
       */
      update: function (weight) {
        return $http.put(SailsRoute.Weight.update(weight.id), weight);
      }
    };
  });
