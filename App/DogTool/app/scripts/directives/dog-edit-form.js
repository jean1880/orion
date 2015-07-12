'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogCard
 * @description
 * # dogCard
 */
angular.module('dogToolApp')
  .directive('dogEditForm', function () {
    return {
      restrict: 'E',
      scope: {
        formCtrl: '=',
        saveClicked: '&',
        cancelClicked: '&',
        imageChanged: '&',
        dog: '='
      },
      templateUrl: 'views/dog/edit-form.html',
      link: function ($scope) {
        $scope.formCtrl = $scope.form;
      }
    };
  });
