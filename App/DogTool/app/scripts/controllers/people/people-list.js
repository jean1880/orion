'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
