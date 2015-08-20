'use strict';

angular.module('dogToolApp')
  .factory('HelperService', function () {
    return {
      convert: {

        /**
         * Converts an array of objects to an array containing just the
         * ids for those objects
         *
         * @param  {array} objects The list of objects to get ids for
         * @return {array}         A list of ids and objects (if an object does not have an id)
         *
         * @throws {TypeError} If an item in the objects array is not an object
         */
        objectArrayToIdArray: function (objects) {
          var ids = objects.map(function (object) {
            if(typeof object === 'object') {
              if (object.id) {
                return object.id;
              }
              else {
                return object;
              }
            }
            else {
              throw new TypeError('Item is not an object');
            }
          });

          return ids;
        }
      }
    };
  });
