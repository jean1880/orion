'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.FactoryHomework
 * @description
 * # FactoryHomework
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryHomework', function ($http, SailsRoute, poller, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Homework dataset
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Homework.get(id))
          .then(returnDataOnly);
      },
      /**
       * One time fetch from server for full Homework dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Homework.getAll)
          .then(returnDataOnly);
      },
      /**
       * One time fetch from server for full Homework dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Homework.listen)
          .then(returnDataOnly);
      },
      /**
       * Post the new Homework dataset
       * @method post
       * @param weight
       */
      post: function (homework) {
        return $http.post(SailsRoute.Homework.post, homework);
      },
      /**
       * One time fetch from server for full Homework dataset
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Homework.find, searchObject)
          .then(returnDataOnly);
      },

      /**
       * Updates the homework option in question
       * @method update
       * @param homework
       */
      update: function (homework) {
        return $http.put(SailsRoute.Homework.update(homework.id), homework);
      },

      /**
       * Delete the homework option in question
       * @method delete
       * @param homeworkId the id of the homework to delete
       */
      remove: function (homeworkId) {
        return $http.delete(SailsRoute.Homework.delete(homeworkId));
      }
    };
  });
