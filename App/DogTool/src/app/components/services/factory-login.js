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
                    .then(function (res) {
                        FactoryAuthToken.setToken(res.data.token);
                        return res.data;
                    });
            },
            validate: function () {
                var data = {
                    token: FactoryAuthToken.getToken()
                };

                return $http.post(loginURL + '/validate', data)
                    .then(function (res) {
                        if (!res.valid) {
                            FactoryAuthToken.delToken();
                        }
                        return res.data;
                    });
            }
        };
    });
