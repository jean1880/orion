'use strict';
/**
 * @class FactoryBehaviourFlag
 * @ngdoc service
 * @name dogToolApp.FactoryBehaviourFlag
 *
 * Handles api calls between sails and angular for BehaviourFlages
 */
angular.module('dogToolApp')
    .factory('FactoryBehaviourFlag', function ($http, SailsRoute, poller, returnDataOnly) {


        return {
            /**
             * Gets a single BehaviourFlag from sails
             *
             * @method get
             * @param {ID} id The id of the BehaviourFlag to retreive
             * @return {Http.promise} Returns a http promise
             */
            get: function (id) {
                return $http.get(SailsRoute.BehaviourFlag.get(id))
                  .then(returnDataOnly);
            },
            /**
             * Gets all BehaviourFlages from sails
             *
             * @method getAll
             * @return {Http.promise} Returns a http promise
             */
            getAll: function () {
                return $http.get(SailsRoute.BehaviourFlag.getAll)
                  .then(returnDataOnly);
            },
            /**
             * Listen for changes
             *
             * @method listen
             * @return {Poller.promise} Returns a poller promise
             */
            listen: function () {
                return poller.get(SailsRoute.BehaviourFlag.listen)
                  .then(returnDataOnly);
            },
            /**
             * Adds the given adress to sails
             *
             * @method post
             * @param {BehaviourFlag} BehaviourFlag The BehaviourFlag for sails to save
             * @return {Http.promise} Returns a http promise
             */
            post: function (BehaviourFlag) {
                return $http.post(SailsRoute.BehaviourFlag.post, BehaviourFlag)
                  .then(returnDataOnly);
            },
            /**
             * Finds BehaviourFlages that match the given search object
             *
             * @method find
             * @param {searchObject} searchObject
             * @return {Http.promise} Returns a http promise
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.BehaviourFlag.find, searchObject);
            },

            /**
            * Updates the given BehaviourFlag in sails
            *
            * @method update
            * @param {BehaviourFlag} BehaviourFlag The BehaviourFlag to update
            * @return {Http.promise} Returns a http promise
            */
            update: function (BehaviourFlag) {
                return $http.put(SailsRoute.BehaviourFlag.update(BehaviourFlag.id), BehaviourFlag);
            }
        };
    });
