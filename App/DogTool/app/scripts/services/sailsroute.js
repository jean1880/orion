'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.SailsRouteProvider
 * @description
 * # SailsRouteProvider
 * Service in the dogToolApp.
 */
angular.module('dogToolApp')
  .service('SailsRoute', function (SAILS_URL) {

    var buildRoutes = function (objectName) {
      return {
        route:  SAILS_URL + '/' + objectName,
        getAll: SAILS_URL + '/' + objectName,
        listen: SAILS_URL + '/' + objectName,
        post:   SAILS_URL + '/' + objectName,
        find:   SAILS_URL + '/' + objectName + '/find',
        get: function (id) {
          return this.route + '/' + id;
        },
        update: function (id) {
          return this.route + '/' + id;
        }
      };
    };

    return {
      Dog:          buildRoutes('dog'),
      Cost:         buildRoutes('cost'),
      Weight:       buildRoutes('weight'),
      Daycare:      buildRoutes('daycare'),
      Note:         buildRoutes('note'),
      People:       buildRoutes('people'),
      Homework:     buildRoutes('homework'),
      Address:      buildRoutes('address'),
      Consultation: buildRoutes('consultation')
    };
  });
