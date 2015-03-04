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

        var init = function () {
            FactoryDog.getAll().then(function (data, status) {
                if (status === 200) {
                    $scope.dogs = data;
                }
                console.log($scope.dogs);
            });
        };

        init();
    });