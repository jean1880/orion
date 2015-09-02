(function () {
  'use strict'
  //modal controller
  angular.module('dogToolApp').controller('CalendarEventCtrl', function ($scope, $location, $timeout, $modalInstance, factoryCalendar, EVENT_COLOURS) {
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
        for (var i = $scope.calendarData.length - 1; i >= 0; i--) {
          if ($scope.calendarData[i].id == $scope.event.id) {
            $scope.event.title = $scope.event.note.Title;
            $scope.calendarData[i] = $scope.event;
          }
        }
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

}());