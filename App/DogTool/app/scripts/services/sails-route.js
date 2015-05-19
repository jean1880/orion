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
        getAll: ServerAddress + '/' + objectName,
        listen: ServerAddress + '/' + objectName,
        post: ServerAddress + '/' + objectName,
        find: ServerAddress + '/' + objectName + '/find',
        get: function (id) {
          return this.route + '/' + id;
        },
        update: function (id) {
          return this.route + '/' + id;
        }
      };
    };

    return {
      Dog: buildRoutes('dog'),
      Cost: buildRoutes('cost'),
      Weight: buildRoutes('weight'),
      Daycare: buildRoutes('daycare'),
      Note: buildRoutes('note'),
      People: buildRoutes('people'),
      Homework: buildRoutes('homework'),
      Address: buildRoutes('address'),
      Consultation: buildRoutes('consultation')
    };
  });
