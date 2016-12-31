'use strict';
/**
 * @class factorybusinessinfo
 * @ngdoc service
 * @name dogToolApp.FactoryBusinessInfo
 *
 * Handles api calls between sails and angular for Business Information
 */
angular.module('dogToolApp')
  .factory('FactoryBusinessInfo', function ($http, SailsRoute, poller,returnDataOnly) {

    return {

		get: function() {
			return $http.get(SailsRoute.BusinessInfo.getAll)
        .then(returnDataOnly);
		},

		update: function (object) {
          //Just want base route, using .get instead of .update
          return $http.put(SailsRoute.BusinessInfo.getAll, object);
        }

    };
  });
