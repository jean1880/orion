'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleViewCtrl
 * @description
 * # PeopleViewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleViewCtrl', function ($scope, $location, FactoryPeople, flash, $stateParams, FactoryDog, $modal, FactoryAddress, FactoryNote) {
    var init = function () {
      loadPerson($stateParams.id);
    };

    var loadPerson = function (id) {
      FactoryPeople.get(id)
        .success(function (response) {
          $scope.person = response;
          loadDogsForPerson($scope.person);
        })
        .error(function (response, status) {
          switch (status) {
          case 404:
            flash.error = 'Person not found';
            break;
          default:
            flash.error = 'An error occured';
            break;
          }

          $location.path('/people');
        });
    };

    var loadDogsForPerson = function (person) {
      FactoryDog.find({
          Owner: person.id
        })
        .success(function (res) {
          person.Dogs = res;
        })
        .error(function () {
          flash.error = 'An error occured loading dog info';
        });
    };

    /**
     * Confirms with user to delete the person, if confirmed the user 
     * is removed from the database
     */
    $scope.ConfirmDelete = function () {
      var modal = $modal.open({
        templateUrl: 'app/confirm-delete/confirm-delete.modal.html',
        controller: 'confirmDeleteModalCtrl',
        size: 'sm',
        animation: true,
        resolve: {}
      });

      modal.result.then(function success() {
        Delete();
      });
    };

    /**
     * Deletes the person from the database
     */
    var Delete = function () {
      // Delete attached notes, and address
      if ($scope.person.Notes.length > 0) {
        for (var i = $scope.person.Notes.length - 1; i >= 0; i--) {
          FactoryNote.destroy($scope.person.Notes[i].id);
        }
      }
      if ($scope.person.Address) {
        FactoryAddress.remove($scope.person.Address.id);
      }

      FactoryPeople.remove($scope.person.id).success(function () {
        flash.success = "Successfully deleted " + $scope.person.Name;
        $location.path("/people");
      }).error(function () {
        flash.error = "Something went wrong, the person was not removed from the database";
      });
    }

    /**
     * handler for the edit button
     *
     * Switches the panel into editing mode when called.
     *
     * @method editInfoBtn
     */
    $scope.editInfoBtn = function () {
      $scope.editedPerson = {
        id: $scope.person.id,
        Name: $scope.person.Name,
        Email: $scope.person.Email,
        Phone: $scope.person.Phone,
        Address: $scope.person.Address
      };

      $scope.editingInfo = true;
    };

    /**
     * handler for the cancel button
     *
     * Reverts all changes to the dog, and return the panel to viewing mode
     *
     * @method cancelInfoBtn
     */
    $scope.cancelInfoBtn = function () {
      $scope.editingInfo = false;
    };

    $scope.updateNotes = function () {
      FactoryPeople.update($scope.person);
    };

    /**
     * handler for the save button
     *
     * if the form is valid, saves changes to the database, and return the panel
     * to viewing mode
     *
     * @method saveInfoBtn
     */
    $scope.editInfoSubmit = function () {
      FactoryPeople.update($scope.editedPerson)
        .success(function (response) {
          $scope.person = response;
          $scope.editingInfo = false;
        })
        .error(function () {
          flash.error = 'An error occured';
        });
    };

    init();
  });