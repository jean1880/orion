'use strict';

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
        showSaveBtn: '=?'
      },
      templateUrl: 'views/directives/notes-panel.html',
      link: function ($scope, element, attrs) {
        if (!angular.isDefined(attrs.showSaveBtn)) {
          $scope.showSaveBtn = true;
        }

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
          $scope.onNotesChanged();
        };

        $scope.removeNote = function (note) {
          var index = $scope.notes.indexOf(note);
          $scope.notes.splice(index, 1);

          var tab = findTabByName(note.NoteType);
          var tabIndex = tab.notes.indexOf(note);
          tab.notes.splice(tabIndex, 1);

          $scope.onNotesChanged();
        };

        $scope.addNote = function (tab) {
          var note = {
            Title: 'New Note',
            Content: '',
            NoteType: tab.name
          };

          $scope.notes.push(note);
          tab.notes.push(note);

          $scope.onNotesChanged();
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
        }
      }
    };
  });
