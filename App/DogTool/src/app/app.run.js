(function () {
  'use strict';
  angular
    .module('dogToolApp')
    .run(function ($location, FactoryLogin, amMoment, $localStorage, $state) {
      $state.go('working');
      $localStorage.calendarData = $localStorage.calendarData || [];
      $localStorage.dogs = $localStorage.dogs || [];
        console.log('test');
      FactoryLogin.validate()
        .success(function (res) {
          if (res.valid) {
            $state.go('dogs');
          } else {
            FactoryLogin.login()
              .success(function () {
                $state.go('dogs');
              });
          }
        })
        .error(function(err){
          console.log(err);
        });;
    });
}());
