(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name dogToolApp.controller:CalendarCtrl
   * @description
   * # HomeworkCtrl
   * Controller of the dogToolApp, manages the calendar/view.html
   */
  angular.module('dogToolApp')
    .controller('CalendarCtrl', function ($scope, $location, $timeout, factoryCalendar, FactoryJob, FactoryNote, $modal, $modalStack, EVENT_COLOURS, flash, $interval) {
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

      var opened = false;
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
        } else if (!$modalStack.getTop()) {
          $scope.event = date;
          $modal.open({
            animation: true,
            templateUrl: 'app/Calendar/modal/event.html',
            controller: 'CalendarEventCtrl',
            scope: $scope
          });
        }
      };

      /**
       * [CreateEvent description]
       * @param {[type]} startDate [description]
       * @param {[type]} endDate   [description]
       */
      var CreateEvent = function (startDate, endDate, allday) {
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

        var variableList = {
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          allDay: allday
        }
        if (!$modalStack.getTop() && !opened) {
          opened = true;
          $modal.open({
            animation: true,
            templateUrl: 'app/Calendar/modal/selection.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
              pass: function () {
                opened = false;
                return variableList;
              }
            }
          });
        }
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
      var SelectDateRange = function (start, end, ev, view) {
        var allday = false;
        if (view.type == 'month') {
          start.add(12, 'h');
        }
        CreateEvent(start, end, allday);
        $('#calendar').fullCalendar('unselect');
      }

      /**
       * Fetches notes from the server
       * @param {Object}   view    Calendar view object
       * @param {Object} element Cakendar element
       */
      var GetNotes = function (view, element) {
        $scope.monthTitle = view.title;
        FactoryNote.find({
          Title: $scope.monthTitle,
          NoteType: $scope.NOTE_TYPE
        }).success(function (data) {
          if (data.length > 0) {
            $scope.monthNoteExists = true;
            $scope.monthNote = data[0];
          } else {
            $scope.monthNoteExists = false;
            $scope.monthNote = {};
          }
          $interval($scope.SaveMonthNote, 300000);
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
      var AddtoCalendar = function (data, title, id, note) {
        var eventColour = note ? EVENT_COLOURS.event : EVENT_COLOURS.booking;
        var colour = data.Colour || eventColour;
        $scope.calendarData.push({
          title: title,
          start: new Date(data.StartDate),
          end: new Date(data.EndDate),
          allDay: data.IsAllDay,
          color: colour,
          jobId: id,
          note: note,
          id: data.id,
          stick: true
        });
      }


      var changeCount = 0;
      /**
       * Saves a note to the database
       * @param {bool} change Flag if funciton is called by ng-change
       */
      $scope.SaveMonthNote = function (change) {
        $scope.monthNote.Title = $scope.monthTitle;
        $scope.monthNote.NoteType = $scope.NOTE_TYPE;
        if (changeCount % 4 == 0) {
          if ($scope.monthNoteExists) {
            FactoryNote.update($scope.monthNote).success(function (data) {
              if (!change) {
                flash.success = 'Note created';
              }
            });
          } else {
            FactoryNote.post($scope.monthNote).success(function (data) {
              if (!change) {
                flash.success = 'Note updated';
              }
              $scope.monthNoteExists = true; // set that a note now exists
            })
          }
        }
        // if count is multiple of four reset the count
        if (changeCount % 4 == 0) {
          changeCount = 0;
        } else {
          changeCount++;
        }
      }


      /**Initializer function called when controller is called
       * @method init
       * @private
       * @return {[type]} [description]
       */
      var init = function () {
        factoryCalendar.getAll().success(function (data) {
          for (var i = data.length - 1; i >= 0; i--) {
            var title, halt = false;
            if (data[i].Note) {
              title = data[i].Note.Title;
              var note = data[i].Note;
            } else if (data[i].Jobs && data[i].Jobs.length > 0) {
              title = data[i].Jobs[0].Name;
              halt = true;
              getJobType(data[i], title);
            }

            // if not trying to fetch jobtype add data to calendar immediately
            if (!halt) {
              AddtoCalendar(data[i], title, null, note);
            }
          };
        });
      };

      init();
    });
}());