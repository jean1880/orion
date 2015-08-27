(function () {
  'use strict';

  angular.module('dogToolApp').filter('slice', limitToFilter);

  function limitToFilter() {
    return function (arr, end, start) {
      console.log(arr);
      return (arr || []).slice(start, start + end);
    };
  }
}());