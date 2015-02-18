'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.FactoryWeight
 * @description
 * # FactoryWeight
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryWeight', function ($sails) {
    var route = '/Weight';

    return {
      /**
       * One time fetch from server for single Weight dataset
       * @method get
       * @param id
       */
      get: function (id) {
          return $sails.get(route + '/' + id);
      },
      /**
       * One time fetch from server for full Weight dataset
       * @method getAll
       */
      getAll: function () {
          return $sails.get(route);
      },
      /**
       * One time fetch from server for full Weight dataset
       * @method listen
       * @param callback
       */
      listen: function (callback) {
          $sails.on(route, callback);
      },
      /**
       * One time fetch from server for full Weight dataset
       * @method post
       * @param weight
       */
      post: function (weight) {
          return $sails.post(route, weight);
      },
      /**
       * One time fetch from server for full Weight dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
          return $sails.post(route + '/find', searchObject);
      }
    };
  });
