(function () {
    'use strict';

    angular
        .module('website')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope) {
        $scope.images = [
            {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }, {
                photoURL: 'http://placehold.it/550x550'
            }
      ]
    }
})();