'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:AboutctrlCtrl
 * @description
 * # AboutctrlCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('AboutctrlCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
