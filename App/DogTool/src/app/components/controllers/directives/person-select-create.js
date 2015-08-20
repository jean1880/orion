'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PersonSelectCreateCtrl
 * @description
 * # PersonSelectCreateCtrl
 * Controller for the personSelectCreate Directive
 */
angular.module('dogToolApp')
  .controller('PersonSelectCreateCtrl', function ($scope, FactoryPeople, flash) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function () {
      reset();

      loadAllPeople();

      //when edit mode on parent controller ends, reset
      $scope.$on('editMode.disabled', reset);
    };

    /**
     * Triggers the personIdChanged callback if the select form is valid
     *
     * @method selectFormSubmit
     */
    $scope.selectFormSubmit = function () {
      if($scope.selectForm.$valid) {
        callPersonIdChanged();
      }
    };

    /**
     * Creates a new person from the createForm, if the form is valid
     *
     * Triggers the personIdChanged callback if creating the person is successful
     *
     * @method selectFormSubmit
     */
    $scope.createFormSubmit = function () {
      FactoryPeople.post($scope.newPerson)
        .success(function (response) {
          $scope.people.push(response);
          $scope.selectedId = response.id;
          $scope.newPerson = {};

          callPersonIdChanged();
        })
        .error(function () {
          flash.error = 'An error occured';
        });
    };

    /**
     * if a personIdChanged callback is defined, calls it with the new person
     *
     * @private
     * @method callPersonIdChanged
     */
    var callPersonIdChanged = function () {
      if($scope.personIdChanged) {
        $scope.personIdChanged($scope.selectedId);
      }
    };

    /**
     * resets the mode of the panel, and sets the forms to pristine and untouched
     *
     * @private
     * @method reset
     */
    var reset = function () {
      $scope.mode = '';

      if($scope.selectForm) {
        $scope.selectForm.$setPristine(true);
        $scope.selectForm.$setUntouched(true);
      }

      if($scope.createForm) {
        $scope.createForm.$setPristine(true);
        $scope.createForm.$setUntouched(true);
      }
    };

    /**
     * loads all people from the database
     *
     * @private
     * @method loadAllPeople
     */
    var loadAllPeople = function () {
      FactoryPeople.getAll()
        .success(function (response) {
          $scope.people = response;
        });
    };

    init();
  });
