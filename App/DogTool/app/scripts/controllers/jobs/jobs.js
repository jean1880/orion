'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:NewjobsCtrl
 * @description
 * # NewjobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('JobsCtrl', function ($scope, FactoryDog, FactoryJob, $routeParams, factoryCalendar) {
	$scope.JobList = [];

	var LoadJobs = function(range) {
		FactoryJob.find({
  			Calendars: range
  		}).success(function(data){
  			console.log(data);
  			$scope.JobList = data;
  			for (var i = data.length - 1; i >= 0; i--) {
  				for (var x = data[i].Dogs.length - 1; x >= 0; x--) {
  					FactoryDog.get(data[i].Dogs[x].id).success(function(dog){
  						for (var y = $scope.JobList.length - 1; y >= 0; y--) {
  							for (var z = $scope.JobList[y].Dogs.length - 1; z >= 0; z--) {
  								if($scope.JobList[y].Dogs[z].id == dog.id){
  									$scope.JobList[y].Dogs[z] = dog;
  								}
  							};
  						};
  					});
  				};
  			};
  		});
	};

	var FetchDateEvents = function(){
		var start = new Date($scope.date.valueOf());
		start.setDate(start.getDate()+1);
		start.setHours(0);
		start.setMinutes(0);

		var end = new Date($scope.date.valueOf());
		end.setHours(0);
		end.setMinutes(0);

		
		factoryCalendar.find({ // this will need to be rewworked for all day events not tied to a job
				StartDate: {
					'<=': start
				},
				EndDate: {
					'>=': end
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