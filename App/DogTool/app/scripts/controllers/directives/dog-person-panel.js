'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogPersonPanelCtrl
 * @description
 * # DogPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogPersonPanelCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
