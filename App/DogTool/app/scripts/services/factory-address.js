'use strict';

/**
 * @ngdoc service
 * @name dogToolApp.address
 * @description
 * # address
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryAddress', function () {
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
