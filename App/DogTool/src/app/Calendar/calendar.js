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
            .controller('CalendarCtrl', function ($scope, $location, $timeout, factoryCalendar, FactoryJob, FactoryNote, $modal, $modalStack, EVENT_COLOURS, flash, $interval, $localStorage, $state) {
                var opened = false,
                    changeCount = 0,
                    temp = [];

                $scope.hstep = 1;
                $scope.mstep = 15;
                $scope.ismeridian = true;

                /****** Public Functions ******/
                $scope.update = update;
                $scope.clear = clear;
                $scope.SaveMonthNote = saveMonthNote;
                $scope.reload = reload;
                $scope.toggleMode = toggleMode;

                /**
                 * End Timepicker
                 */


                /**
                 * Calendar settings
                 */
                $localStorage.calendarData = $localStorage.calendarData || [];
                $scope.eventSources = [$localStorage.calendarData]
                $scope.addingEvent = false;
                $scope.allDay = true;
                $scope.monthNote = {};
                $scope.monthTitle = null;
                $scope.monthNoteExists = false;
                $scope.NOTE_TYPE = 'MonthNote';


                /* config object */
                $scope.uiConfig = {
                    calendar: {
                        editable: true,
                        height: 'auto',
                        selectable: true,
                        nextDayThreshold: "00:00:00",
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

                factoryCalendar.getAll()
                    .success(calendarDataLoaded);

                /**
                 * Loops through returned data and creates calendar object for the view
                 * @method calendarDataLoaded
                 * @param {Object} $http response object
                 */
                function calendarDataLoaded(data) {
                    async.each(data, parseCalendarData);

                    /**
                     * Build out calendar off of returned data
                     */
                    function parseCalendarData(item, callback) {
                        var title, halt = false,
                            note;
                        if (item.Note) {
                            title = item.Note.Title;
                            note = item.Note;
                            AddtoCalendar(item, title, null, note);
                        } else if (item.Jobs && item.Jobs.length > 0) {
                            title = item.Jobs[0].Name;
                            halt = true;
                            getJobType(item, title);
                        }
                        return callback();
                    }
                }

                function toggleMode() {
                    $scope.ismeridian = !$scope.ismeridian;
                }

                /**
                 * Called when
                 * @return {[type]} [description]
                 */
                function update() {
                    var d = new Date();
                    d.setHours(14);
                    d.setMinutes(0);
                    $scope.mytime = d;
                };

                function clear() {
                    $scope.mytime = null;
                }

                /**
                 * Rounds the date to the bottom, or top of the hour
                 * @param  {object} date new date object
                 * @return {object}      Modified date object
                 */
                function roundHour(date, topOfTheHour) {
                    date.setSeconds(0);
                    date.setMinutes(0);
                    if (topOfTheHour) {
                        date.setHours(date.getHours() + 1);
                    }
                    return date;
                };



                /**
                 * Goes to the jobs for the day
                 * @method GotoJob
                 * @param {Object} date Moment.js date object
                 */
                function GotoJob(date) {
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
                 * Creates new event
                 * @method CreateEvent
                 * @param {[type]} startDate [description]
                 * @param {[type]} endDate   [description]
                 */
                function CreateEvent(startDate, endDate, allday) {
                    var variableList;
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

                    variableList = {
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
                function UpdateEvent(event) {
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
                 * @method SelectDateRange
                 * @param {[type]} start [description]
                 * @param {[type]} end   [description]
                 */
                function SelectDateRange(start, end, ev, view) {
                    var allday = false;
                    if (view.type == 'month') {
                        start.add(12, 'h');
                    }
                    CreateEvent(start, end, allday);
                    $('#calendar')
                        .fullCalendar('unselect');
                }

                /**
                 * Fetches notes from the server
                 * @param {Object}   view    Calendar view object
                 * @param {Object} element Cakendar element
                 */
                function GetNotes(view, element) {
                    $scope.monthTitle = view.title;
                    FactoryNote.find({
                            Title: $scope.monthTitle,
                            NoteType: $scope.NOTE_TYPE
                        })
                        .success(function (data) {
                            if (data.length > 0) {
                                $scope.monthNoteExists = true;
                                $scope.monthNote = data[0];
                            } else {
                                $scope.monthNoteExists = false;
                                $scope.monthNote = {};
                            }
                        })
                }

                /**
                 * End calendar controls
                 */

                /**
                 * [AddtoCalendar description]
                 * @param {[type]} data  [description]
                 * @param {[type]} title [description]
                 */
                function AddtoCalendar(data, title, id, note) {
                    var eventColour = note ? EVENT_COLOURS.event : EVENT_COLOURS.booking,
                        colour = data.Colour || eventColour;

                    // Loop through all of the fetched events
                    async.forEachOf($localStorage.calendarData, addEventToCalendar, calendarbuilt);

                    function addEventToCalendar (calandar, index, cb) {
                        var found = false;
                        if (calandar.id === data.id && data.StartDate && data.EndDate) {
                            found = true;
                            $localStorage.calendarData[index].title = title;
                            $localStorage.calendarData[index].start = new Date(data.StartDate);
                            $localStorage.calendarData[index].end = new Date(data.EndDate);
                            $localStorage.calendarData[index].note = note;
                            $localStorage.calendarData[index].color = colour;
                        }
                        cb(found);
                    }

                    function calendarbuilt (found) {
                        if (!found && data.StartDate && data.EndDate) {
                            $localStorage.calendarData.push({
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
                    }
                }
                /**
                 * [getJobType description]
                 * @param  {[type]} dataObject [description]
                 * @param  {[type]} title      [description]
                 * @return {[type]}            [description]
                 */
                function getJobType(dataObject, title) {
                    FactoryJob.get(dataObject.Jobs[0].id)
                        .success(function (data) {
                            AddtoCalendar(dataObject, title + ' - ' + data.Jobtype.Name, data.id);
                        });
                }
                /**
                 * Saves a note to the database
                 * @param {bool} change Flag if funciton is called by ng-change
                 */
                function SaveMonthNote(change) {
                    $scope.monthNote.Title = $scope.monthTitle;
                    $scope.monthNote.NoteType = $scope.NOTE_TYPE;
                    if (changeCount % 4 == 0) {
                        if ($scope.monthNoteExists) {
                            FactoryNote.update($scope.monthNote)
                                .success(function (data) {
                                    if (!change) {
                                        flash.success = 'Note created';
                                    }
                                });
                        } else {
                            FactoryNote.post($scope.monthNote)
                                .success(function (data) {
                                    if (!change) {
                                        flash.success = 'Note updated';
                                    }
                                    $scope.monthNoteExists = true; // set that a note now exists
                                })
                        }
                    };
                    // if count is multiple of four reset the count
                    if (changeCount % 4 == 0) {
                        changeCount = 0;
                    } else {
                        changeCount++;
                    }
                }

                /**
                 * Completely resets the calendar
                 * @return {[type]} [description]
                 */
                function reload() {
                    delete $localStorage.calendarData;
                    $state.go('calendar', null, {
                        reload: true
                    });
                }
            }());
