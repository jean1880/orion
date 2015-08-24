(function () {
  'use strict';


  angular.module('dogToolApp')
    .controller('confirmBookingDeleteModalCtrl', function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
}());