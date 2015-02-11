'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
