(function () {
    'use strict';
    angular
        .module('dogToolApp')
        .run(function ($localStorage) {
            $localStorage.calendarData = $localStorage.calendarData || [];
            $localStorage.dogs = $localStorage.dogs || [];
        });
}());
