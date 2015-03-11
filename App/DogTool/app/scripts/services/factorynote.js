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
  .factory('FactoryNote', function ($http, ServerAddress, poller) {
    var route = ServerAddress + '/Note';

    return {
            /**
             * One time fetch from server for single Note dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Note dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(route);
            },
            /**
             * One time fetch from server for full Note dataset
             * @method listen
             */
            listen: function () {
                return poller.get(route);
            },
            /**
             * One time fetch from server for full Note dataset
             * @method post
             * @method post
             * @param note
             */
            post: function (note) {
                return $http.post(route, note);
            },
            /**
             * One time fetch from server for full Note dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(route + '/find', searchObject);
            },

            update: function (note) {
                return $http.post(route + "/" + note.id, note);
            }
    };
  });