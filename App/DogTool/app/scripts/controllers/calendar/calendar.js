'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:CalendarCtrl
 * @description
 * # HomeworkCtrl
 * Controller of the dogToolApp, manages the calendar/view.html
 */
angular.module('dogToolApp')
  .controller('CalendarCtrl', function ($scope, $location, $timeout, factoryCalendar, FactoryJob, FactoryNote, $modal, $modalStack) {
    /**
     * Rounds the date to the bottom, or top of the hour
     * @param  {object} date new date object
     * @return {object}      Modified date object
     */
    var roundHour = function (date, topOfTheHour) {
      date.setSeconds(0);
      date.setMinutes(0);
      if (topOfTheHour) {
        date.setHours(date.getHours() + 1);
      }
      return date;
    };

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
      $scope.ismeridian = !$scope.ismeridian;
    };

    /**
     * Called when
     * @return {[type]} [description]
     */
    $scope.update = function () {
      var d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      $scope.mytime = d;
    };

    $scope.clear = function () {
      $scope.mytime = null;
    };
    /**
     * End Timepicker
     */


    /**
     * Calendar settings
     */
    $scope.calendarData = [];
    $scope.eventSources = [$scope.calendarData]
    $scope.addingEvent = false;
    $scope.allDay = true;
    $scope.monthNote = {};
    $scope.monthTitle = null;
    $scope.monthNoteExists = false;
    $scope.NOTE_TYPE = 'MonthNote';

    /**
     * Goes to the jobs for the day
     * @param {Object} date Moment.js date object
     */
    var GotoJob = function (date) {
      if (date.jobId) {
        $location.url('/jobs/' + date.jobId);
      }
    };

    var CreateEventDay = function (startDate, endDate) {
      startDate.add(4, 'h');
      CreateEvent(startDate, endDate);
    }

    /**
     * [CreateEvent description]
     * @param {[type]} startDate [description]
     * @param {[type]} endDate   [description]
     */
    var CreateEvent = function (startDate, endDate) {
      $scope.day = startDate;

      if (endDate.clone) {
        $scope.endDay = endDate
      } else {
        $scope.endDay = startDate.clone();
        $scope.endDay.add(1, 'h');
        $scope.allDay = true;
      }

      $scope.startTime = $scope.day.toDate();
      $scope.endTime = $scope.endDay.toDate();

      var varibleList = {
        startTime: $scope.startTime,
        endTime: $scope.endTime
      }

      if (!$modalStack.getTop()) {
        $modal.open({
          animation: true,
          templateUrl: 'selection.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            pass: function () {
              return varibleList;
            }
          }
        });
      }
    };

    /**
     * Adds event to server and local array
     * @method  AddEvent
     */
    $scope.AddEvent = function () {
      var startDay = $scope.day.toDate();
      startDay.setHours(startDay.getHours() + 4);

      var endDay = $scope.endDay.toDate();
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
          })
          //        $('#calendar-event').modal('hide');
      });
    };

    /**
     * Updates target event start and end datetime
     * @param {object} event FullCalendar event object
     */
    var UpdateEvent = function (event) {
      var endDay = event.end ? event.end.toDate() : null;
      var startDay = event.start.toDate();
      if (!endDay) {
        startDay.setHours(startDay.getHours() + 4);
      }
      factoryCalendar.update({
        StartDate: event.start.toDate(),
        EndDate: endDay,
        id: event.id
      })
    }

    /**
     * Creates an event from given datetime range
     * @param {[type]} start [description]
     * @param {[type]} end   [description]
     */
    var SelectDateRange = function (start, end) {
      CreateEvent(start, end);
      $('#calendar').fullCalendar('unselect');
    }

    var GetNotes = function (view, element) {
      $scope.monthTitle = view.title;
      FactoryNote.find({
        Title: $scope.monthTitle,
        NoteType: $scope.NOTE_TYPE
      }).success(function (data) {
        console.log(data);
        if (data.length > 0) {
          $scope.monthNoteExists = true;
          $scope.monthNote = data[0];
        } else {
          $scope.monthNoteExists = false;
          $scope.monthNote = {};
        }
      })
    }

    /* config object */
    $scope.uiConfig = {
      calendar: {
        editable: true,
        height: 'auto',
        selectable: true,
        eventLimit: true, // allow "more" link when too many events
        header: {
          left: 'title',
          center: 'today prev,next',
          right: 'month, agendaWeek, agendaDay'
        },
        select: SelectDateRange,
        eventClick: GotoJob,
        dayClick: CreateEventDay,
        timezone: 'local',
        eventResize: UpdateEvent,
        eventDrop: UpdateEvent,
        viewRender: GetNotes
      }
    };
    /**
     * End calendar controls
     */

    /**
     * [getJobType description]
     * @param  {[type]} dataObject [description]
     * @param  {[type]} title      [description]
     * @return {[type]}            [description]
     */
    var getJobType = function (dataObject, title) {
      FactoryJob.get(dataObject.Jobs[0].id).success(function (data) {
        AddtoCalendar(dataObject, title + ' - ' + data.Jobtype.Name, data.id);
      });
    };

    /**
     * [AddtoCalendar description]
     * @param {[type]} data  [description]
     * @param {[type]} title [description]
     */
    var AddtoCalendar = function (data, title, id) {
      $scope.calendarData.push({
        title: title,
        start: new Date(data.StartDate),
        end: new Date(data.EndDate),
        allDay: data.IsAllDay,
        jobId: id,
        id: data.id,
        stick: true
      });
    }


    $scope.SaveMonthNote = function () {
      $scope.monthNote.Title = $scope.monthTitle;
      $scope.monthNote.NoteType = $scope.NOTE_TYPE;
      if ($scope.monthNoteExists) {
        FactoryNote.update($scope.monthNote).success(function (data) {
          console.log("Updated note");
        });
      } else {
        FactoryNote.post($scope.monthNote).success(function (data) {
          console.log("created note");
        })
      }
    }


    /**
     * [init description]
     * @return {[type]} [description]
     */
    var init = function () {
      factoryCalendar.getAll().success(function (data) {
        for (var i = data.length - 1; i >= 0; i--) {
          var title, halt = false;
          if (data[i].Note) {
            title = data[i].Note.Title;
          } else if (data[i].Jobs && data[i].Jobs.length > 0) {
            title = data[i].Jobs[0].Name;
            halt = true;
            getJobType(data[i], title);
          }

          // if not trying to fetch jobtype add data to calendar immediately
          if (!halt) {
            AddtoCalendar(data[i], title);
          }
        };
      });
    };

    init();
  });