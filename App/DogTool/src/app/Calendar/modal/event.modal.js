(function () {
  'use strict'
  //modal controller
  angular.module('dogToolApp').controller('CalendarEventCtrl', function ($scope, $location, $timeout, $modalInstance, factoryCalendar, EVENT_COLOURS, flash, $localStorage) {
    $scope.ok = function () {
      $modalInstance.close();
    };
    console.log($scope.event);

    /**
     * Update event to server and local array
     * @method  AddEvent
     */
    $scope.UpdateEvent = function () {
      var eventColour = EVENT_COLOURS.event;


      var startDay = new Date($scope.event.start.valueOf())
      startDay.setHours(startDay.getHours());

      var endDay = new Date($scope.event.end.valueOf());
      endDay.setHours(endDay.getHours());

      factoryCalendar.update({
        StartDate: startDay,
        EndDate: endDay,
        Note: $scope.event.note,
        Colour: eventColour,
        id: $scope.event.id
      }).success(function () {
        $modalInstance.close();
        for (var i = $localStorage.calendarData.length - 1; i >= 0; i--) {
          if ($localStorage.calendarData[i].id == $scope.event.id) {
            $scope.event.title = $scope.event.note.Title;
            $localStorage.calendarData[i] = $scope.event;
          }
        }
      });
    };


    $scope.deleteEvent = function (id) {
      factoryCalendar.remove(id).success(function () {
        $scope.cancel();
        flash.success = "Removed event";
        for (var i = $localStorage.calendarData.length - 1; i >= 0; i--) {
          if ($localStorage.calendarData[i].id == $scope.event.id) {
            $localStorage.calendarData.splice(i, 1);
          }
        }
      });
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

}());