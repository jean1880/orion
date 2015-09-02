(function () {
  'use strict';
  angular
    .module('dogToolApp')
    .run(function ($location, FactoryLogin, amMoment) {
      var url = $location.url();
      $location.url('/working');

      FactoryLogin.validate()
        .success(function (res) {
          if (res.valid) {
            $location.url(url);
          } else {
            FactoryLogin.login()
              .success(function () {
                $location.url(url);
              });
          }
        });
    });
}());