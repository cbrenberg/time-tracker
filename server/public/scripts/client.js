console.log('client.js loaded');

const app = angular.module('TimeTrackerApp', []);

app.controller('EntriesController', ['$http', function ($http) {
  let vm = this;
  vm.entryToAdd = {};

  vm.addEntry = function() {
    console.log('In addEntry');
    $http.post('/entries', {
      name: vm.entryToAdd.name,
      project_id: vm.entryToAdd.project_id, //HOW TO SELECT ID FROM ng-options???
      date: vm.entryToAdd.date,
      start_time: vm.entryToAdd.start_time,
      end_time: vm.entryToAdd.start_time
    })
    .then(function(response) {
      console.log('Entry added', response);
    })
    .catch(function(error) {
      console.log('Error adding entry', error);
    })
  }
}])