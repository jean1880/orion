'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.SailsRouteProvider
 * @description
 * # SailsRouteProvider
 * Service in the dogToolApp.
 */
angular.module('dogToolApp')
  .service('SailsRoute', function (ServerAddress) {
    //TODO: move ServerAddress into this file

    var buildRoutes = function (objectName) {
      return {
        route:  ServerAddress + '/' + objectName,
        getAll: ServerAddress + '/' + objectName,
        listen: ServerAddress + '/' + objectName,
        post:   ServerAddress + '/' + objectName,
        find:   ServerAddress + '/' + objectName + '/find',
        get: function(id) {
          return this.route + '/' + id;
        },
        update: function(id) {
          return this.route + '/' + id;
        }
      };
    };

    return {
      Dog: buildRoutes('dog'),
      Weight: buildRoutes('weight'),
      Daycare: buildRoutes('daycare'),
      Note: buildRoutes('note'),
      People: buildRoutes('people')
    };
  });
