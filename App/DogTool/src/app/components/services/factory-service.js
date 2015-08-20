'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryquote
 * @description
 * # factoryquote
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryService', function (SailsRoute, $http, poller) {
    return {
      /**
       * One time fetch from server for single Service dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Service.get(id));
      },

      /**
       * One time fetch from server for full Quote dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Service.getAll);
      },

      /**
       * Post Quote dataset to collection
       * @method post
       * @param people
       */
      post: function (service) {
        return $http.post(SailsRoute.Service.post, service);
      },

      /**
       * One time update for the Quote dataset
       * @method update
       * @param person  object
       */
      update: function (service) {
        return $http.put(SailsRoute.Service.update(service.id), service);
      }
    };
  });
