console.log('client.js loaded');

const app = angular.module('TimeTrackerApp', []);

app.controller('EntriesController', ['$http', function ($http) {
  let vm = this;
  vm.entryToAdd = {};
  vm.entries = []

  vm.addEntry = function () {
    console.log('In addEntry');
    $http.post('/entries', {
      name: vm.entryToAdd.name,
      project_id: vm.entryToAdd.project_id, //HOW TO SELECT ID? FROM ng-options???
      date: vm.entryToAdd.date,
      start_time: vm.entryToAdd.start_time,
      end_time: vm.entryToAdd.start_time
    })
      .then(function (response) {
        console.log('Entry added', response);
      })
      .catch(function (error) {
        console.log('Error adding entry', error);
      })//end $http
  }//end addEntry

  vm.getEntries = function () {
    $http.get('/entries')
      .then(function (response) {
        console.log('Back from server with:', response);
        // vm.entries = response.data;
        //reformat duration as hours
        // console.log(moment.duration(vm.entries[0].duration).asHours());
        vm.entries = response.data.map(function(entry) {
          entry.date = moment(entry.date).format("MM/DD/YYYY");
          entry.duration = moment.duration(entry.duration).asHours();
          if (entry.duration.toString().length > 3) {
            entry.duration = entry.duration.toFixed(2);
          } else {
            entry.duration = entry.duration
          }
          return entry;
        })//end map
        console.log(vm.entries);
        
      })
      .catch(function (error) {
        console.log('Error getting entries:', error);
      })//end $http
  }//end getEntries

  //call getEntries on page load
  vm.getEntries();

}])//end EntriesController