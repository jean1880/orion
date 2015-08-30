(function () {
  'use strict'
  //modal controller
  angular.module('dogToolApp').controller('CalendarEventCtrl', function ($scope, $location, $timeout, $modalInstance, factoryCalendar) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    /**
     * Update event to server and local array
     * @method  AddEvent
     */
    $scope.UpdateEvent = function () {
      console.log($scope.event);
      /*var eventColour = '#5bc0de';
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
      });*/
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

}());