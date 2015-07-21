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
        dog: '='
      },
      templateUrl: 'views/dog/edit-form.html',
      link: function ($scope) {
        $scope.formCtrl = $scope.form;
      },
      controller: function ($scope, FactoryBehaviourFlag) {
        var init = function () {
          FactoryBehaviourFlag.getAll()
            .success(function (res) {
              $scope.behaviourFlags = res;
            });

          $scope.$watch('dog', function () {
            if(!$scope.dog) { return; }

            setDogDefaults($scope.dog);
          });
        };

        var setDogDefaults = function (dog) {
          if(!dog.Gender) { dog.Gender = 'Unknown'; }
          if(!dog.SpayedNeutered) { dog.SpayedNeutered = 'Unknown'; }
          if(!dog.OnTiters) { dog.OnTiters = 'Unknown'; }
          if(!dog.BehaviourFlag) { dog.BehaviourFlag = null; }
        };

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        init();
      }
    };
  });
