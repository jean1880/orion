'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.FactoryHomework
 * @description
 * # FactoryHomework
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryHomework', function ($http, SailsRoute, poller) {
        return {
            /**
             * One time fetch from server for single Homework dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Homework.get(id));
            },
            /**
             * One time fetch from server for full Homework dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Homework.getAll);
            },
            /**
             * One time fetch from server for full Homework dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Homework.listen);
            },
            /**
             * One time fetch from server for full Homework dataset
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
                return $http.post(SailsRoute.Homework.find, searchObject);
            },

            update: function (homework) {
                return $http.post(SailsRoute.Homework.update(homework.id), homework);
            }
        };
    });