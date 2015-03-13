'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.SailsRouteProvider
 * @description
 * # SailsRouteProvider
 * Service in the dogToolApp.
 */
angular.module('dogToolApp')
  .service('SailsRoute', function () {
    var server = 'http://localhost:1337';

    var buildRoutes = function (objectName) {
      return {
        route: server + '/' + objectName,
        find: server + '/' + objectName + '/find',
        get: function(id) {
          return this.route + '/' + id;
        }
      };
    };

    return {
      Dog: buildRoutes('dog'),
      Weight: buildRoutes('weight'),
      Note: buildRoutes('note')
    };
  });
