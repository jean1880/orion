'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PersonPanelCtrl
 * @description
 * # PersonPanelCtrl
 * Controller for the Person Panel Directive
 */
angular.module('dogToolApp')
  .controller('PersonPanelCtrl', function ($scope, FactoryPeople) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function () {
      $scope.editMode = false;
    };

    /**
     * switches the panel into edit mode, allowing for changing the person.
     *
     * @method enableEditMode
     */
    $scope.enableEditMode = function () {
      $scope.editMode = true;
   	};

    /**
     * switches the panel into reading mode
     *
     * broadcasts 'editMode.disabled'
     *
     * @method disableEditMode
     */
   	$scope.disableEditMode = function () {
      $scope.editMode = false;

      //communicate to the person-select-create directive to tell it to reset
      $scope.$broadcast('editMode.disabled');
   	};

    /**
     * if the person can be unlinked, the person is unset
     *
     * @method unlinkPerson
     */
    $scope.unlinkPerson = function () {
      if($scope.unlinkable) {
        $scope.person = null;
        personUpdatedCallback(null);
      }
    };

    /**
     * updates the panel with the new person
     *
     * @method personIdChanged
     * @param {ID} newId The id of the new person
     */
    $scope.personIdChanged = function (newId) {
      FactoryPeople.get(newId)
        .success(function (response) {
          $scope.person = response;
          $scope.disableEditMode();

          personUpdatedCallback(newId);
        });
    };

    /**
     * if a personUpdated callback is defined, calls it with the new person
     *
     * @private
     * @method personUpdatedCallback
     * @param {ID} newId The id of the new person
     */
    var personUpdatedCallback = function (newId) {
      if($scope.personUpdated){
        $scope.personUpdated(newId);
      }
    };

    init();
  });
