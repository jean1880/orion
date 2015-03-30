'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DirectivesPersonPanelCtrl
 * @description
 * # DirectivesPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonPanelCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
