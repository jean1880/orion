'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:CalendarCtrl
 * @description
 * # HomeworkCtrl
 * Controller of the dogToolApp, manages the calendar/view.html
 */
angular.module('dogToolApp')
  .controller('CalendarCtrl', function ($scope, $location) {
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

    var GotoDay = function(date){
      $location.url('/jobs');
    };

    var CreateEvent = function(startDate, endDate){
      $scope.day = startDate;
      $scope.endDay = endDate || startDate;
      
      $('#calendar-event').modal('show');
    };

    var AddEvent = function(){
      console.log($scope.startDate);
    };

    var SelectDateRange = function(start, end) {
      CreateEvent(start,end);
      $('#calendar').fullCalendar('unselect');
    }

  	/* config object */
    $scope.uiConfig = {
      calendar:{
        editable: true,
        selectable: true,
        eventLimit: true, // allow "more" link when too many events
        header:{
          left: 'title',
          center: 'today prev,next',
          right: 'month, agendaWeek, agendaDay'
        },
        select: SelectDateRange,
        eventClick: GotoDay,
        dayClick: CreateEvent
      }
    };
    /**
     * End calendar controls
     */


    var init = function(){
      $('.fc-toolbar').find('.fc-button-group').addClass('btn-group');
  		$('.fc-toolbar').find('.ui-button').addClass('btn btn-primary');
  		$('.fc-toolbar').find('.fc-prev-button').html($('<span />').attr('class', 'glyphicon glyphicon-chevron-left'));
  		$('.fc-toolbar').find('.fc-next-button').html($('<span />').attr('class', 'glyphicon glyphicon-chevron-right'));
    };

    init();
  });
