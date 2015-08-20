'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleNewCtrl
 * @description
 * # PeopleNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleNewCtrl', function ($scope, FactoryPeople, flash, $location) {
    var init = function() {
      $scope.person = {};
    };

    /**
     * Creates a new person from the createForm, if the form is valid
     *
     * Triggers the personIdChanged callback if creating the person is successful
     *
     * @method selectFormSubmit
     */
    $scope.editFormSubmit = function () {
      FactoryPeople.post($scope.person)
        .success(function (response) {
          flash.success = 'Person created';
          $location.path('/people/' + response.id);
        })
        .error(function () {
          flash.error = 'An error occured';
        });
    };

    init();
  });
