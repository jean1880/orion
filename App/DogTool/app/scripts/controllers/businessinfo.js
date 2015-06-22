'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:BusinessinfoCtrl
 * @description
 * # BusinessinfoCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('BusinessinfoCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.BusinessInfo = {
       Title: "Business Information", 
       Name: "Not Just Kibble", 
       Address: "6878 10th Line",
       Phone: "(705)500-4493", 
       Email: "NotJustKibble@awesome.com"
    };
  });
