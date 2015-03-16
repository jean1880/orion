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
  .factory('FactoryPeople', function (SailsRoute, $http, poller) {
        return {
            /**
             * One time fetch from server for single People dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.People.get(id));
            },
            /**
             * One time fetch from server for full People dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.People.getAll);
            },
            /**
             * One time fetch from server for full People dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.People.listen);
            },
            /**
             * One time fetch from server for full People dataset
             * @method post
             * @param people
             */
            post: function (people) {
                return $http.post(SailsRoute.People.post, people);
            },
            /**
             * One time fetch from server for full People dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.People.find, searchObject);
            },
			/**
             * One time update for the Person dataset
             * @method update
             * @param person  object
             */
            update: function (person) {
                return $http.post(SailsRoute.People.update(person.id), person);
            }
        };
    });

