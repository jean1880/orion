'use strict';

/* global moment */

/**
 * @class FactoryDog
 * @ngdoc service
 * @name dogToolApp.FactoryDo
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryDog', function ($http, SailsRoute, SAILS_URL, poller, Upload, returnDataOnly) {
    return {
      /**
       * One time fetch from server for single Dog dataset based on id
       * @method get
       * @param id
       */
      get: function (id) {
        return $http.get(SailsRoute.Dog.get(id))
          .then(returnDataOnly);
      },

      /**
       * One time fetch from server for full Dog dataset
       * @method getAll
       */
      getAll: function () {
        return $http.get(SailsRoute.Dog.getAll)
          .then(returnDataOnly);
      },

      getAllNoPopulate: function () {
        return $http.get(SailsRoute.Dog.getAll + '?populate=[BehaviourFlag,Owner]')
          .then(returnDataOnly);
      },

      /**
       * Listen to server for changes to full Dog dataset
       * @method listen
       */
      listen: function () {
        return poller.get(SailsRoute.Dog.listen)
          .then(returnDataOnly);
      },

      /**
       * Pushes a new dog into the database
       * @method post
       * @param Dog
       */
      post: function (dog) {
        return $http.post(SailsRoute.Dog.post, dog)
          .then(returnDataOnly);
      },

      /**
       * Searches for specific Dog dataset based  on search object
       * @method find
       * @param searchObject
       */
      find: function (searchObject) {
        return $http.post(SailsRoute.Dog.find, searchObject)
          .then(returnDataOnly);
      },

      /**
       * Updates a dog,basd on the dog id
       * @method find
       * @param searchObject
       */
      update: function (dog) {
        return $http.put(SailsRoute.Dog.update(dog.id), dog)
          .then(returnDataOnly);
      },

      /**
       * Upoads a photo for the dog to the server
       * @param {file} file
       * @param {object} Dog
       * @return {promise}
       */
      upload: function (file, dog) {
        return Upload.upload({
          url: SAILS_URL + '/Dog/uploadPhoto/' + dog.id,
          file: file[0]
        });
      },

      /**
       * Converts the raw data on the given dog into more manageable objects
       *
       * - birthdate is converted to a Date Object
       * - age is populated from the birthdate
       *
       * @method processDog
       * @param  {Dog} dog The dog to update
       */
      processDog: function (dog) {
        if (dog.Birthdate) {
          dog.Birthdate = new Date(dog.Birthdate);
          dog.Age = moment(dog.Birthdate)
            .fromNow(true);
        } else {
          dog.Birthdate = undefined;
          dog.Age = undefined;
        }
      }
    };
  });
