'use strict';

/**
 * @class FactoryDog
 * @ngdoc service
 * @name dogToolApp.FactoryDo
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
    .factory('FactoryDog', function ($sails) {
        // Service logic
        // ...

        var route = '/Dog';

        // Public API here
        return {
            /**
             * One time fetch from server for single Dog dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $sails.get(route + '/' + id);
            },
            /**
             * One time fetch from server for full Dog dataset
             * @method getAll
             */
            getAll: function () {
                return $sails.get(route);
            },
            /**
             * One time fetch from server for full Dog dataset
             * @method listen
             * @param callback
             */
            listen: function (callback) {
                $sails.on(route, callback);
            },
            /**
             * One time fetch from server for full Dog dataset
             * @method post
             * @param dog
             */
            post: function (dog) {
                return $sails.post(route, dog);
            },
            /**
             * One time fetch from server for full Dog dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $sails.post(route + '/find', searchObject);
            }
        };
    });