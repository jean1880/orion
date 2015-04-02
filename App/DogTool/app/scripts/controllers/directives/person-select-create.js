'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PersonSelectCreateCtrl
 * @description
 * # DirectivesPersonSelectCreateCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonSelectCreateCtrl', function ($scope) {
    var init = function () {
      reset();

      //when edit mode on parent controller ends, reset
      $scope.$on('editMode.disabled', reset);
    };

    var reset = function () {
      $scope.mode = '';
    };

    init();
  });
