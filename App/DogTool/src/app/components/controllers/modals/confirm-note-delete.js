'use strict';


angular.module('dogToolApp')
  .controller('confirmNoteDeleteModalCtrl', function ($scope, $modalInstance, data) {
    $scope.note = data.note;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
