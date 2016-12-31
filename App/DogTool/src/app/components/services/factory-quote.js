'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryquote
 * @description
 * # factoryquote
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryQuote', function (SailsRoute, $http, poller, returnDataOnly) {
	return {
      /**
       * One time fetch from server for single Quote dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Quote.get(id))
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Quote dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Quote.getAll)
          .then(returnDataOnly);
      },

      /**
       * Post Quote dataset to collection
       * @method post
       * @param people
       */
      post: function (quote) {
        return $http.post(SailsRoute.Quote.post, quote);
      },

      /**
       * One time update for the Quote dataset
       * @method update
       * @param person  object
       */
      update: function (quote) {
        return $http.put(SailsRoute.Quote.update(quote.id), quote);
      }
    };
  });
