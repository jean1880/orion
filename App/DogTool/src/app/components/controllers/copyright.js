(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name dogToolApp.controller:CopyrightCtrl
   * @description
   * # CopyrightCtrl
   * Controller of the dogToolApp
   */
  angular.module('dogToolApp')
    .controller('CopyrightCtrl', function ($scope) {
      $scope.now = new Date();
    });
}());