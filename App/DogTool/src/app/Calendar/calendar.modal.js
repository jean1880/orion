(function () {
  'use strict'
  //modal controller
  angular.module('dogToolApp').controller('ModalInstanceCtrl', function ($scope, $location, $timeout, $modalInstance, pass, factoryCalendar) {

    $scope.startTime = pass.startTime;
    $scope.endTime = pass.endTime;
    $scope.allDay = pass.allDay;

    $scope.ok = function () {
      $modalInstance.close();
    };
    /**
     * Goes to the jobs for the day
     * @param {Object} date Moment.js date object
     */
    $scope.GotoDay = function () {
      var startDay = new Date($scope.startTime.valueOf());
      startDay.setHours(startDay.getHours() + 4);
      $location.url('/jobs/day/' + encodeURI(startDay));
      $modalInstance.close();
    };

    /**
     * [CreateBooking description]
     */
    $scope.CreateBooking = function () {
      var startDay = new Date($scope.startTime.valueOf());
      startDay.setHours(startDay.getHours());

      var endDay = new Date($scope.endTime.valueOf());
      endDay.setHours(endDay.getHours());

      if ($scope.allDay) {
        $location.url('/jobs/new/' + encodeURI(startDay) + '/' + encodeURI(endDay) + '/' + encodeURI($scope.allDay));
      } else {
        $location.url('/jobs/new/' + encodeURI(startDay) + '/' + encodeURI(endDay));
      }
      $modalInstance.close();
    };

    /**
     * Adds event to server and local array
     * @method  AddEvent
     */
    $scope.AddEvent = function () {
      var eventColour = '#5bc0de';
      var startDay = new Date($scope.startTime.valueOf())
      startDay.setHours(startDay.getHours() + 4);

      var endDay = new Date($scope.endTime.valueOf());
      endDay.setHours(endDay.getHours() + 4);

      factoryCalendar.post({
        StartDate: startDay,
        EndDate: endDay,
        Note: {
          Title: $scope.title,
          Content: $scope.note,
          NoteType: 'event',
          IsAllDay: $scope.allDay || false
        }
      }).success(function () {
        $scope.calendarData.push({
          title: $scope.title,
          start: $scope.day.toDate(),
          end: $scope.endDay.toDate(),
          allDay: $scope.allDay
        });
        $modalInstance.close();
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

}())