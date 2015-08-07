'use strict';

angular.module('dogToolApp')
    .factory('FactoryLogin', function ($http, SAILS_URL, FactoryAuthToken, PASSWORD_CERT) {
        var loginURL = SAILS_URL + '/login';

        return {
            login: function () {
                var data = {
                    passwordCert: PASSWORD_CERT
                };

                return $http.post(loginURL, data)
                    .success(function (res) {
                        FactoryAuthToken.setToken(res.token);
                    });
            },
            validate: function () {
                var data = {
                    token: FactoryAuthToken.getToken()
                };

                return $http.post(loginURL + '/validate', data)
                    .success(function (res) {
                        if (!res.valid) {
                            FactoryAuthToken.delToken();
                        }
                    });
            }
        };
    });
