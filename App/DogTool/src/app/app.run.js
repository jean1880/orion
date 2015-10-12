(function () {
  'use strict';
  angular
    .module('dogToolApp')
    .run(function ($location, FactoryLogin, amMoment, $localStorage) {
      var url = $location.url();
      $location.url('/working');
      $localStorage.calendarData = $localStorage.calendarData || [];
      $localStorage.dogs = $localStorage.dogs || [];

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