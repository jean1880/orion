(function () {
  'use strict';

  angular.module('dogToolApp').filter('slice', limitToFilter);

  function limitToFilter() {
    return function (arr, end, start) {
      return (arr || []).slice(start, start + end);
    };
  }
}());