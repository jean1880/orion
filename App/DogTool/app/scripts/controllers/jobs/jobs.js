'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:NewjobsCtrl
 * @description
 * # NewjobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('JobsCtrl', function ($scope, FactoryJob, $routeParams, factoryCalendar) {
	$scope.JobList = [];

	var LoadJobs = function(range) {
		FactoryJob.find({
  			Calendars: range
  		}).success(function(data){
  			console.log(data);
  			$scope.JobList = data;
  		});
	};

	var FetchDateEvents = function(){
		factoryCalendar.find({
			StartDate: {
				'<': $scope.date
			},
			EndDate: {
				'>': $scope.date
			}
		}).success(function(data){
			console.log(data);
			$scope.events = data;
			var ids = [];
			for(var i = 0; i < $scope.events.length; i++){
				ids.push($scope.events[i].id)
			}
			LoadJobs(ids);
		});
	};

  	var init = function(){
  		$scope.date = $routeParams.date || new Date();
  		FetchDateEvents();
  	};

  	init();
  });