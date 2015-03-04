'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
    .controller('MainCtrl', function ($scope, FactoryDog) {
        $scope.dogs = null;

        FactoryDog.getAll()
            .success(function (response) {
                $scope.dogs = response;
            });
    });
