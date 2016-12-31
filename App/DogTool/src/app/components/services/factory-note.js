'use strict';

/**
 * @class FactoryNote
 * @ngdoc service
 * @name dogToolApp.FactoryNote
 * @description
 * # FactoryNote
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryNote', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Note dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Note.get(id))
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Note dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Note.getAll)
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Note dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Note.listen);
      },

      /**
       * One time fetch from server for full Note dataset
       * @method post
       * @param note
       */
      post: function (note) {
        return $http.post(SailsRoute.Note.post, note)
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Note dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Note.find, searchObject)
          .then(returnDataOnly);
      },

      update: function (note) {
        return $http.put(SailsRoute.Note.update(note.id), note);
      },

      destroy: function (note) {
        return $http.delete(SailsRoute.Note.delete(note.id));
      }
    };
  });
