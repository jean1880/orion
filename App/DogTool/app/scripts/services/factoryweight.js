'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.FactoryWeight
 * @description
 * # FactoryWeight
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryWeight', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
