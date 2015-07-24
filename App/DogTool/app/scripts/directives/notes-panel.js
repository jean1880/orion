'use strict';

/* global async */

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogCard
 * @description
 * # dogCard
 */
angular.module('dogToolApp')
  .directive('notesPanel', function () {
    return {
      restrict: 'E',
      scope: {
        notes: '=',
        defaultTypes: '=',
        onNotesChanged: '&',
        showSaveBtn: '=?',
        panelTitle: '=',
        panelType: '='
      },
      templateUrl: 'views/directives/notes-panel.html',
      link: function ($scope, element, attrs) {
        if (!angular.isDefined(attrs.showSaveBtn)) {
          $scope.showSaveBtn = true;
        }
      },
      controller: function($scope, FactoryNote, flash, $modal) {
        $scope.tabs = [];

        $scope.$watch('notes', function () {
          if(!$scope.notes){
            return;
          }

          $scope.tabs.forEach(function (tab) {
            tab.notes = [];
          });

          $scope.notes.forEach(function (note) {
            var tab = findTabByName(note.NoteType);

            if(tab === null) {
              tab = {
                name: note.NoteType,
                notes: []
              };

              $scope.tabs.push(tab);
            }

            tab.notes.push(note);
          });
        });

        $scope.$watch('defaultTypes', function () {
          if(!$scope.defaultTypes) {
            return;
          }

          $scope.defaultTypes.forEach( function (type) {
            var tab = findTabByName(type);

            if(tab === null) {
              tab = {
                name: type,
                notes: []
              };

              $scope.tabs.push(tab);
            }
          });
        });

        $scope.saveAllNotes = function () {
          async.map($scope.notes, saveNote, function (err, updatedNotes) {
            $scope.notes = updatedNotes;

            $scope.onNotesChanged();
          });
        };

        $scope.saveNoteOnBlur = function (note) {
          if(note.Title && note.Content){
            console.log("blurred");
          var action;
          if(note.id) {
            action = FactoryNote.update(note);
          }
          else {
            action = FactoryNote.post(note);
          }

          action
            .success(function (res) { })
            .error(function (res) {  });
          }
        };
        
        var saveNote = function (note, callback) {
          var action;
          if(note.id) {
            action = FactoryNote.update(note);
          }
          else {
            action = FactoryNote.post(note);
          }

          action
            .success(function (res) { callback(null, res); })
            .error(function (res) { callback(res); });
        };

        $scope.comfirmDelete = function (note) {
          var modal = $modal.open({
            templateUrl: 'views/modals/confirm-note-delete.html',
            controller: 'confirmNoteDeleteModalCtrl',
            size: 'sm',
            animation: true,
            resolve: {
              data: function () {
                return {
                  note: note
                };
              }
            }
          });

          modal.result.then(function success() {
            removeNote(note);
          });
        };

        var removeNote = function (note) {
          var index = $scope.notes.indexOf(note);

          FactoryNote.destroy(note)
            .success(function(res){
              $scope.notes.splice(index, 1);

              var tab = findTabByName(note.NoteType);
              var tabIndex = tab.notes.indexOf(note);

              tab.notes.splice(tabIndex, 1);

              $scope.onNotesChanged();
            })
            .error(function(res) {
              flash.error = 'An error occured while deleteing the Note';
            });
        };

        $scope.addNote = function (tab) {
          var note = {
            Title: 'New Note',
            Content: '',
            NoteType: tab.name
          };

          FactoryNote.post(note)
            .success(function(res){
              $scope.notes.push(res);
              tab.notes.push(res);

              $scope.onNotesChanged();
            })
            .error(function() {
              flash.error = 'An error occured while creating a Note';
            });
        };

        var findTabByName = function(name) {
          var foundTab = null;
          $scope.tabs.forEach(function (tab) {
            if(foundTab !== null) {
              return;
            }

            if(tab.name === name) {
              foundTab = tab;
            }
          });
          return foundTab;
        };
      }
    };
  });
