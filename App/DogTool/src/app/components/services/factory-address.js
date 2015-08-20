'use strict';
/**
 * @class FactoryAddress
 * @ngdoc service
 * @name dogToolApp.FactoryAddress
 *
 * Handles api calls between sails and angular for Addresses
 */
angular.module('dogToolApp')
    .factory('FactoryAddress', function ($http, SailsRoute, poller) {


        return {
            /**
             * Gets a single address from sails
             *
             * @method get
             * @param {ID} id The id of the address to retreive
             * @return {Http.promise} Returns a http promise
             */
            get: function (id) {
                return $http.get(SailsRoute.Address.get(id));
            },
            /**
             * Gets all addresses from sails
             *
             * @method getAll
             * @return {Http.promise} Returns a http promise
             */
            getAll: function () {
                return $http.get(SailsRoute.Address.getAll);
            },
            /**
             * Listen for changes
             *
             * @method listen
             * @return {Poller.promise} Returns a poller promise
             */
            listen: function () {
                return poller.get(SailsRoute.Address.listen);
            },
            /**
             * Adds the given adress to sails
             *
             * @method post
             * @param {Address} Address The address for sails to save
             * @return {Http.promise} Returns a http promise
             */
            post: function (Address) {
                return $http.post(SailsRoute.Address.post, Address);
            },
            /**
             * Finds addresses that match the given search object
             *
             * @method find
             * @param {searchObject} searchObject
             * @return {Http.promise} Returns a http promise
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Address.find, searchObject);
            },

            /**
            * Updates the given address in sails
            *
            * @method update
            * @param {Address} address The address to update
            * @return {Http.promise} Returns a http promise
            */
            update: function (address) {
                return $http.put(SailsRoute.Address.update(address.id), address);
            }
        };
    });
