'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:CalendarCtrl
 * @description
 * # HomeworkCtrl
 * Controller of the dogToolApp, manages the calendar/view.html
 */
angular.module('dogToolApp')
  .controller('CalendarCtrl', function ($scope, $location, $timeout, factoryCalendar) {
    /**
     * Rounds the date to the bottom, or top of the hour
     * @param  {object} date new date object
     * @return {object}      Modified date object
     */
    var roundHour = function(date, topOfTheHour){
      date.setSeconds(0);
      date.setMinutes(0);
      if(topOfTheHour){
        date.setHours(date.getHours() + 1);
      }
      return date;
    };

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    /**
     * Called when  
     * @return {[type]} [description]
     */
    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.clear = function() {
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

   /**
    * Goes to the jobs for the day
    * @param {Object} date Moment.js date object
    */
    var GotoDay = function(date){
      $location.url('/jobs');
    };

    $scope.CreateBooking = function(){
      $('#calendar-event').modal('hide');
      $timeout(function(){
        $location.url('/jobs/new')
      },350)
    }

    var CreateEvent = function(startDate, endDate){
      $scope.day = startDate;

      if(endDate.clone){
        $scope.endDay = endDate
      }else{        
        $scope.endDay = startDate.clone();
        $scope.endDay.add(1,'h');
        $scope.allDay = true;
      }

      $scope.startTime = $scope.day.toDate();
      $scope.endTime = $scope.endDay.toDate();
      
      $('#calendar-event').modal('show');
    };

    /**
     * Adds event to server and local array
     * @method  AddEvent
     */
    $scope.AddEvent = function(){
      factoryCalendar.post({
        StartDate: $scope.day.toDate(),
        EndDate: $scope.endDay.toDate(),
        Note: {
          Title: $scope.title,
          Content: $scope.note,
          NoteType: 'event',
          IsAllDay: $scope.allDay || false
        }
      }).success(function(){
        $scope.calendarData.push({
          title: $scope.title,
          start: $scope.day.toDate(),
          end: $scope.endDay.toDate(),
          allDay: $scope.allDay || false
        })
        $('#calendar-event').modal('hide');
      });
    };

    /**
     * Updates target event start and end datetime
     * @param {object} event FullCalendar event object
     */
    var UpdateEvent = function(event){
      console.log(event);
      factoryCalendar.update({
        StartDate: event.start.toDate(),
        EndDate: event.end.toDate(),
        id: event.id
      })
    }

    /**
     * Creates an event from given datetime range
     * @param {[type]} start [description]
     * @param {[type]} end   [description]
     */
    var SelectDateRange = function(start, end) {
      CreateEvent(start,end);
      $('#calendar').fullCalendar('unselect');
    }

  	/* config object */
    $scope.uiConfig = {
      calendar:{
        editable: true,
        height: 'auto',
        selectable: true,
        eventLimit: true, // allow "more" link when too many events
        header:{
          left: 'title',
          center: 'today prev,next',
          right: 'month, agendaWeek, agendaDay'
        },
        select: SelectDateRange,
        eventClick: GotoDay,
        dayClick: CreateEvent,
        timezone: 'local',
        eventResize: UpdateEvent,
        eventDrop: UpdateEvent
      }
    };
    /**
     * End calendar controls
     */


    var init = function(){
      factoryCalendar.getAll().success(function(data){
        for (var i = data.length - 1; i >= 0; i--) {
          $scope.calendarData.push({
            title: data[i].Title,
            start: new Date(data[i].StartDate),
            end: new Date(data[i].EndDate),
            allDay: data[i].IsAllDay || false,
            id: data[i].id
          });
        };
      });
    };

    init();
  });
