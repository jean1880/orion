'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogCard
 * @description
 * # dogCard
 */
angular.module('dogToolApp')
    .directive('dogImage', function (SAILS_URL, $log) {
        return {
            restrict: 'A',
            scope: {
                dog: '=dogImage'
            },
            link: function ($scope, element, attrs) {
                $scope.$watch('dog.photoURL', function () {
                    if (!$scope.dog) {
                        return;
                    }

                    $log.info($scope.dog.photoURL);

                    if ($scope.dog.photoURL) {
                        attrs.$set('src', SAILS_URL + $scope.dog.photoURL);
                    } else {
                        attrs.$set('src', 'images/no-dog-image.jpg');
                    }
                });
            }
        };
    });