'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });