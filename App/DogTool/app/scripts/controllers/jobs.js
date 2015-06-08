'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')

  .controller('JobsCtrl', function ($scope,$routeParams, $location, FactoryJob) {
    //Add test connection to the page when loaded
  $scope.JobListTest='test';
    FactoryJob.getAll()
        .success(function (response) {
          $scope.JobListTest = response;
        })
        .error(function () {
          flash.error = 'A error occured while loading Jobs.';
        });
   
    $scope.Job= {titleOf:"Job Title Place Holder",hasJobId:true};
  
    $scope.JobList= [{
"id":435436,
"title":"test job",
"dateStart":"Apr.16/15 : 10:00am",
"dateEnd":"Apr.16/15 : 1:00pm",
"location": "123 Fake Street",
"type":"Daycare",
"img":["http://loremflickr.com/300/300/dog?random=154","http://loremflickr.com/300/300/dog?random=1660"]
},
{
"id":43543666,
"title":"test job2",
"dateStart":"Jan 14, 2015 1:00pm",
"dateEnd":"Jan 15,2015 6:00pm",
"location": "123 Fake Street",
"type":"In-Home",
"img":["http://loremflickr.com/300/300/dog?random=14","http://loremflickr.com/300/300/dog?random=160","http://loremflickr.com/300/300/dog?random=60"]
}
];
  
  });
