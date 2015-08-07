'use strict';
/**
 * @class FactoryExpense
 * @ngdoc service
 * @name dogToolApp.FactoryExpense
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryExpense', function ($http, SailsRoute, poller, Upload) {
    return {
      /**
       * One time fetch from server for single Expense dataset based on id
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Expense.get(id));
      },

      /**
       * One time fetch from server for full Expense dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Expense.getAll);
      },

      /**
       * Listen to server for changes to full Expense dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Expense.listen);
      },

      /**
       * Pushes a new expense into the database
       * @method post
       * @param expense
       */
      post: function (expense) {
        return $http.post(SailsRoute.Expense.post, expense);
      },

      /**
       * Searches for specific Expense dataset based  on search object
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Expense.find, searchObject);
      },

      /**
       * Updates an expense, based on the dog id
       * @method find
       * @param searchObject
       */
      update: function (expense) {
        return $http.put(SailsRoute.Expense.update(expense.id), expense);
      }
    };
  });

