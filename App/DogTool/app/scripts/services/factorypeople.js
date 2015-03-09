'use strict';

/**
 * @class FactoryPeople
 * @ngdoc service
 * @name dogToolApp.FactoryPeople
 * @description
 * # FactoryPeople
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryPeople', function () {
    var route = ServerAddress + '/People';

        return {
            /**
             * One time fetch from server for single People dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full People dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(route);
            },
            /**
             * One time fetch from server for full People dataset
             * @method listen
             */
            listen: function () {
                return poller.get(route);
            },
            /**
             * One time fetch from server for full People dataset
             * @method post
             * @param people
             */
            post: function (people) {
                return $http.post(route, people);
            },
            /**
             * One time fetch from server for full People dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(route + '/find', searchObject);
            },
			/**
             * One time update for the Person dataset
             * @method update
             * @param person  object
             */
            update: function (person) {
                return $http.post(route + "/" + person.id, person);
            }
        };
    });

