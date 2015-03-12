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
    var buildRoutes = function (objectName) {
      return {
        route: ServerAddress + '/' + objectName,
        find: ServerAddress + '/' + objectName + '/find',
        get: function(id) {
          return this.route + '/' + id;
        }
      };
    };

    return {
      Dog: buildRoutes('dog'),
      Weight: buildRoutes('weight')
    };
  });
