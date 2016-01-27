(function () {
  'use strict'
  //modal controller
  angular.module('dogToolApp').controller('ModalInstanceCtrl', function ($scope, $location, $timeout, $modalInstance, pass, factoryCalendar, FactoryNote, EVENT_COLOURS, $localStorage) {

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
      $modalInstance.close();
      var startDay = new Date($scope.startTime.valueOf());
      startDay.setHours(startDay.getHours());

      var endDay = new Date($scope.endTime.valueOf());
      endDay.setHours(endDay.getHours());

      if ($scope.allDay) {
        $location.url('/jobs/new/' + encodeURI(startDay) + '/' + encodeURI(endDay) + '/' + encodeURI($scope.allDay));
      } else {
        $location.url('/jobs/new/' + encodeURI(startDay) + '/' + encodeURI(endDay));
      }
    };

    /**
     * Adds event to server and local array
     * @method  AddEvent
     */
    $scope.AddEvent = function () {
      $modalInstance.close();
      var eventColour = EVENT_COLOURS.event;
      var startDay = new Date($scope.startTime.valueOf())
      var endDay = new Date($scope.endTime.valueOf());

      factoryCalendar.post({
        StartDate: startDay,
        EndDate: endDay,
        Note: {
          Title: $scope.title,
          Content: $scope.note,
          NoteType: 'event',
          IsAllDay: $scope.allDay || false
        },
        Colour: EVENT_COLOURS.event
      }).success(function (data) {
        FactoryNote.get(data.Note).success(function (item) {
          $localStorage.calendarData.push({
            id: data.id,
            color: data.Colour,
            note: item,
            title: $scope.title,
            start: $scope.day.toDate(),
            end: $scope.endDay.toDate(),
            allDay: $scope.allDay
          });
        });
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

}());
