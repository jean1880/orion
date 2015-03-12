'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.DogToolRoute
 * @description
 * # DogToolRoute
 * Provides routes to pages in the dog tool
 *   Currently, these need to be added manually to the app.js file as well
 */
angular.module('dogToolApp')
    .service('DogToolRoute', function () {
        return {
            home: '/',
            Dog: {
                list: '/dog',
                view: function (id) { return '/dog/' + id; },
                edit: function (id) { return '/dog/' + id + '/edit'; },
                new: '/dog/new'
            }
        };
    });
