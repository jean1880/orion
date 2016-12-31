(function(){
    'use strict';

    angular.module('dogToolApp')
      .service('returnDataOnly', returnDataOnly);

      function returnDataOnly(){
        return function(res) {
          return res.data;
        }
      }
}());
