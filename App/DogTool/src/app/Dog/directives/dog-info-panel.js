(function(){
    'use strict';

    /* global moment */

    /**
     * @ngdoc directive
     * @name dogToolApp.directive:dogInfoPanel
     * @description
     * # dogInfoPanel
     */
    angular.module('dogToolApp')
      .directive('dogInfoPanel', function () {
        return {
          restrict: 'E',
          scope: {
            dog: '='
          },
          templateUrl: 'app/Dog/directives/dog-info-panel.html',
          link: function ($scope) {
            $scope.labels = {
              SpayedNeutered: 'Neutered'
            };
          },
          controller: function ($scope, FactoryDog, flash, SAILS_URL) {
            $scope.src = SAILS_URL;
            $scope.$watch('dog', function () {
              if (!$scope.dog) {
                return;
              }

              if (!$scope.dog.SpayedNeutered) {
                $scope.dog.SpayedNeutered = 'Unknown';
              }

              if (!$scope.dog.Deceased) {
                $scope.dog.Deceased = false;
              }

              if ($scope.dog.Gender === 'Male') {
                $scope.labels.SpayedNeutered = 'Neutered';
              } else if ($scope.dog.Gender === 'Female') {
                $scope.labels.SpayedNeutered = 'Spayed';
              }
            });

            /**
             * handler for the edit button
             *
             * Switches the panel into editing mode when called.
             *
             * @method editInfoBtn
             */
            $scope.editInfoBtn = function () {
              $scope.editingInfo = true;

              if (!$scope.dog.BehaviourFlag) {
                $scope.dog.BehaviourFlag = {
                  id: null
                };
              }

              $scope.editedDog = {
                id: $scope.dog.id,
                Name: $scope.dog.Name,
                Breed: $scope.dog.Breed,
                Birthdate: $scope.dog.Birthdate,
                Gender: $scope.dog.Gender,
                SpayedNeutered: $scope.dog.SpayedNeutered,
                OnTiters: $scope.dog.OnTiters,
                Deceased: $scope.dog.Deceased,
                BehaviourFlag: $scope.dog.BehaviourFlag.id,
                photoURL: $scope.dog.photoURL
              };

              $scope.infoForm.$setDirty(false);
            };

            /**
             * handler for the save button
             *
             * if the form is valid, saves changes to the database, and return the panel
             * to viewing mode
             *
             * @method saveInfoBtn
             */
            $scope.saveInfoBtn = function () {
              console.log($scope.dog);
              if ($scope.infoForm.$valid) {
                console.log($scope.editedDog);
                if ($scope.infoForm.$dirty) {
                  updateDog($scope.editedDog);
                } else {
                  $scope.editingInfo = false;
                }
              }
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

            /**
             * Uplaods a file to the server
             * @method upload
             * @param {array} Files array
             */
            $scope.upload = function (file) {
              if (file.length > 0) {
                FactoryDog.upload(file, $scope.dog).progress(function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data) {
                  $scope.dog.photoURL = data.photoURL;
                });
              }
            };

            /**
             * Updates the given dog in the database
             *
             * @private
             * @method updateDog
             * @param {Dog} dog The dog to update
             */
            var updateDog = function (dog) {
              FactoryDog.update(dog)
                .success(processSuccess)
                .error(processError);
            };

            /**
             * Processes a successful response from the server
             *
             * updates the dog on the scope with the new data from the response
             *
             * @private
             * @method processSuccess
             * @param {Sails.response} response The response from the server containing
             *   the new dog data
             */
            var processSuccess = function (response) {
              FactoryDog.processDog(response);

              $scope.dog = response;
              $scope.editingInfo = false;
              $scope.infoForm.$setDirty(false);
            };

            /**
             * Processes a failed response from the server
             *
             * @private
             * @method processError
             * @param {Sails.response} response The response from the server containing
             *   the reason the request failed
             */
            var processError = function () {
              flash.error = 'An error occured';
            };
          }
        };
      });
}());
