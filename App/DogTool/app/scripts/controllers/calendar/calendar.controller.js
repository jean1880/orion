'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:CalendarCtrl
 * @description
 * # HomeworkCtrl
 * Controller of the dogToolApp, manages the calendar/view.html
 */
angular.module('dogToolApp')
  .controller('CalendarCtrl', function ($scope) {
  	/* config object */
    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'title',
          center: 'today prev,next',
          right: 'month, agendaWeek, agendaDay'
        }
      }
    };

    var init = function(){
    	$('.fc-toolbar').find('.fc-button-group').addClass('btn-group');
		$('.fc-toolbar').find('.ui-button').addClass('btn btn-primary');
		$('.fc-toolbar').find('.fc-prev-button').html($('<span />').attr('class', 'glyphicon glyphicon-chevron-left'));
		$('.fc-toolbar').find('.fc-next-button').html($('<span />').attr('class', 'glyphicon glyphicon-chevron-right'));
    };

    init();
  });
