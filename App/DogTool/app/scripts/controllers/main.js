'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('MainCtrl', function ($scope, FactoryDog) {
    $scope.dogs = tmpGetAllDogs();
    // FactoryDog.getAll();
  });

var tmpGetAllDogs = function () {
  return [
    {
      "Weights": [
        {
          "DateTaken": "2015-02-19T02:01:28.000Z",
          "Weight": 45.6,
          "Dog": "54e5569389b7d8302e9f5e59",
          "createdAt": "2015-02-19T03:20:51.792Z",
          "updatedAt": "2015-02-19T03:20:51.792Z",
          "id": "54e5569389b7d8302e9f5e5a"
        }
      ],
      "Notes": [
        {
          "Title": "Brat Dog",
          "Note": "That Other brat dog",
          "NoteType": "General",
          "createdAt": "2015-02-19T03:20:51.793Z",
          "updatedAt": "2015-02-19T03:20:51.794Z",
          "id": "54e5569389b7d8302e9f5e5b"
        }
      ],
      "Consultations": [],
      "Daycares": [],
      "Homeworks": [],
      "Owner": {
        "PeopleType": "Owner",
        "Address": "54e5569389b7d8302e9f5e55",
        "Name": "Mankey Primate",
        "Email": "Mankey@gmail.com",
        "Phone": "705-513-7647",
        "createdAt": "2015-02-19T03:20:51.777Z",
        "updatedAt": "2015-02-19T03:20:51.777Z",
        "id": "54e5569389b7d8302e9f5e57"
      },
      "Vet": {
        "PeopleType": "Vet",
        "Address": "54e5569389b7d8302e9f5e56",
        "Name": "Dr Extreme Vet",
        "Email": "vet@live.com",
        "Phone": "705-777-6677",
        "createdAt": "2015-02-19T03:20:51.779Z",
        "updatedAt": "2015-02-19T03:20:51.779Z",
        "id": "54e5569389b7d8302e9f5e58"
      },
      "Name": "Dog",
      "Breed": "Pit Bull",
      "Age": "2002-02-19T02:01:28.000Z",
      "createdAt": "2015-02-19T03:20:51.781Z",
      "updatedAt": "2015-02-19T03:20:51.785Z",
      "id": "54e5569389b7d8302e9f5e59"
    },
    {
      "Weights": [
        {
          "DateTaken": "2015-02-18T02:01:28.000Z",
          "Weight": 145.6,
          "Dog": "54e556a689b7d8302e9f5e5f",
          "createdAt": "2015-02-19T03:21:10.641Z",
          "updatedAt": "2015-02-19T03:21:10.641Z",
          "id": "54e556a689b7d8302e9f5e60"
        }
      ],
      "Notes": [
        {
          "Title": "Brat Dog",
          "Note": "That brat dog",
          "NoteType": "General",
          "createdAt": "2015-02-19T03:21:10.642Z",
          "updatedAt": "2015-02-19T03:21:10.642Z",
          "id": "54e556a689b7d8302e9f5e61"
        }
      ],
      "Consultations": [],
      "Daycares": [],
      "Homeworks": [],
      "Owner": {
        "PeopleType": "Owner",
        "Address": "54e556a689b7d8302e9f5e5d",
        "Name": "Randy Thompson",
        "Email": "k9thom@live.com",
        "Phone": "705-503-3647",
        "createdAt": "2015-02-19T03:21:10.636Z",
        "updatedAt": "2015-02-19T03:21:10.636Z",
        "id": "54e556a689b7d8302e9f5e5e"
      },
      "Vet": {
        "PeopleType": "Vet",
        "Address": "54e5569389b7d8302e9f5e56",
        "Name": "Dr Extreme Vet",
        "Email": "vet@live.com",
        "Phone": "705-777-6677",
        "createdAt": "2015-02-19T03:20:51.779Z",
        "updatedAt": "2015-02-19T03:20:51.779Z",
        "id": "54e5569389b7d8302e9f5e58"
      },
      "Name": "Moose",
      "Breed": "Bull Mastiff",
      "Age": "2002-02-19T02:01:28.000Z",
      "createdAt": "2015-02-19T03:21:10.637Z",
      "updatedAt": "2015-02-19T03:21:10.638Z",
      "id": "54e556a689b7d8302e9f5e5f"
    }
  ]
};
