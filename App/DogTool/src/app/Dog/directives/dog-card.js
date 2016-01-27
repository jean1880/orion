'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogCard
 * @description
 * # dogCard
 */
angular.module('dogToolApp')
  .directive('dogCard', function () {
    return {
      restrict: 'E',
      scope: {
        dog: '=',
        noClick: '=',
        btnText: '=',
        btnClick: '&',
        btnType: '='
      },
      templateUrl: 'app/Dog/directives/dog-card.html',
      controller: function ($scope, $location, SAILS_URL) {
          $scope.dogURL = SAILS_URL;
        $scope.gotoDogPage = function () {
          if (!$scope.noClick) {
            $location.path('/dog/' + $scope.dog.id);
          }
        };

        $scope.callButtonCallback = function ($event) {
          $event.stopPropagation();
          $scope.btnClick();
        };
      }
    };
  });
