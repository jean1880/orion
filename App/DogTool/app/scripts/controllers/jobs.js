'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('JobsCtrl', function ($scope,$routeParams, $location, FactoryDog, FactoryNote) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //Add test connection to the page when loaded
    $scope.Job= {titleOf:"Job Title Place Holder",hasJobId:true};
  });
