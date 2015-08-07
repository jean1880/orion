'use strict';

/**
 * @ngdoc filter
 * @name dogToolApp.filter:truncateFilter
 * @function
 * @description trims the text into
 * @param {String} text to truncate
 * @param {int} the length in words, default is 10
 * @param {String} end characters to indicate truncation, default is "..."
 * @return {String} Truncated text
 * # truncateFilter
 * Filter in the dogToolApp.
 */
angular.module('dogToolApp')
  .filter('truncateFilter', function () {

    return function (text, length, end) {
      if (isNaN(length))
        length = 10;

      if (end === undefined)
        end = "...";
      
      if (text) {
        var inputWords = text.split(/\s+/);
        if (inputWords.length > length) {
          text = inputWords.slice(0, length).join(' ') + '...';
        }
      }
      return text;

    };
  });