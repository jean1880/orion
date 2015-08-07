'use strict';
/**
 * @ngdoc service
 * @name dogToolApp.FactoryConsultation
 * @description
 * # FactoryConsultation
 * Factory in the dogToolApp.
 */
angular.module('dogToolApp')
  .factory('FactoryConsultation', function ($http, SailsRoute, poller) {
    return {
            /**
             * One time fetch from server for single Consultation dataset
             * @method get
             * @param id
             */
            get: function (id) {
                return $http.get(SailsRoute.Consultation.get(id));
            },
            /**
             * One time fetch from server for full Consultation dataset
             * @method getAll
             */
            getAll: function () {
                return $http.get(SailsRoute.Consultation.getAll);
            },
            /**
             * One time fetch from server for full Consultation dataset
             * @method listen
             */
            listen: function () {
                return poller.get(SailsRoute.Consultation.listen);
            },
            /**
             * One time fetch from server for full Consultation dataset
             * @method post
             * @param consultation
             */
            post: function (consultation) {
                return $http.post(SailsRoute.Consultation.post, consultation);
            },
            /**
             * One time fetch from server for full Consultation dataset
             * @method find
             * @param searchObject
             */
            find: function (searchObject) {
                return $http.post(SailsRoute.Consultation.find, searchObject);
            },
			/**
             * One time fetch from server for full Consultation dataset
             * @method update
             * @param searchObject
             */
            update: function (consultation) {
                return $http.put(SailsRoute.Consultation.update(consultation.id), consultation);
            }
        };
  });
