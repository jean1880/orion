'use strict';
/**
 * @class factorybusinessinfo
 * @ngdoc service
 * @name dogToolApp.FactoryBusinessInfo
 *
 * Handles api calls between sails and angular for Business Information
 */
angular.module('dogToolApp')
  .factory('FactoryBusinessInfo', function ($http, SailsRoute, poller) {

    return {
		
		get: function() {
			return $http.get(SailsRoute.Business_info.get);
		},
		
		listen: function() {
			return poller.get(SailsRoute.Business_info.listen);
		},
		
        /**
         * Pushes a new business info into the database
         * @method post
         * @param expense
         */
        post: function (businessInfo) {
          return $http.post(SailsRoute.Business_info.post, businessInfo);
        },
      
		update: function (object) {
        return $http.post(SailsRoute.Business_info.update(object.id), object);
        }
		
    };
  });
