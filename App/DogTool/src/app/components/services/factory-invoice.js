'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryInvoice
 * @description
 * # FactoryInvoice
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryInvoice', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Invoice dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Invoice.get(id))
          .then(returnDataOnly);
      },
      /**
       * One time fetch from server for full Invoice dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Invoice.getAll)
          .then(returnDataOnly);
      },
      /**
       * One time fetch from server for full Invoice dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Invoice.listen)
          .then(returnDataOnly);
      },
      /**
       * Post the new Invoice dataset
       * @method post
       * @param invoice
       */
      post: function (invoice) {
        return $http.post(SailsRoute.Invoice.post, homework);
      },
      /**
       * One time fetch from server for full Invoice dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Invoice.find, searchObject)
          .then(returnDataOnly);
      },

      /**
       * Updates the Invoice option in question
       * @method update
       * @param homework
       */
      update: function (homework) {
        return $http.put(SailsRoute.Invoice.update(homework.id), homework);
      },

      /**
       * Delete the Invoice option in question
       * @method delete
       * @param homeworkId the id of the homework to delete
       */
      remove: function (homeworkId) {
        return $http.delete(SailsRoute.Invoice.delete(homeworkId));
      }
    };
  });
