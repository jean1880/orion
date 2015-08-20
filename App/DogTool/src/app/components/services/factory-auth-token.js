'use strict';

angular.module('dogToolApp')
    .factory('FactoryAuthToken', function ($rootScope, $cookies) {
        var storageKeyName = 'user_token';

        return {
            setToken: function (token) {
                $rootScope.userLoggedIn = true;
                $cookies[storageKeyName] = token;
            },
            getToken: function () {
                return $cookies[storageKeyName];
            },
            delToken: function () {
                $rootScope.userLoggedIn = false;
                delete $cookies[storageKeyName];
            }
        };
    });
