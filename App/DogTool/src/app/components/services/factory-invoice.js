'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.factoryInvoice
 * @description
 * # FactoryInvoice
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryInvoice', function ($http, SailsRoute, poller) {
    return {
      /**
       * One time fetch from server for single Invoice dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Invoice.get(id));
      },
      /**
       * One time fetch from server for full Invoice dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Invoice.getAll);
      },
      /**
       * One time fetch from server for full Invoice dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Invoice.listen);
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
        return $http.post(SailsRoute.Invoice.find, searchObject);
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
