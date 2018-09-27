// MODULE OUT INTO ENTRIES CONTROLLER
app.controller('EntriesController', ['$http', function ($http) {
  let vm = this;
  vm.entryToAdd = {};
  vm.entries = [];

  vm.addEntry = function () {
    console.log('In addEntry');
    $http.post('/entries', {
      name: vm.entryToAdd.name,
      project_id: vm.entryToAdd.project_id, //HOW TO SELECT ID? FROM ng-options???
      date: vm.entryToAdd.date,
      start_time: moment(vm.entryToAdd.start_time, 'hh:mm A').format('HH:mm'), //reformats standard time as 24hr HH:mm
      end_time: moment(vm.entryToAdd.end_time, 'hh:mm A').format('HH:mm') //same as above
    })
      .then(function (response) {
        console.log('Entry added', response);
        //refresh table after adding new entry
        vm.getEntries();
      })
      .catch(function (error) {
        console.log('Error adding entry', error);
      })//end $http
  }//end addEntry

  vm.getEntries = function () {
    $http.get('/entries')
      .then(function (response) {
        console.log('Back from server with:', response);
        //reformat duration as hours rounded to two decimal places and date as MM/DD/YYYY
        vm.entries = response.data.map(function (entry) {
          entry.date = moment(entry.date).format("MM/DD/YYYY");
          entry.duration = moment.duration(entry.duration).asHours();
          if (entry.duration.toString().length > 3) {
            entry.duration = entry.duration.toFixed(2);
          }
          //append reformatted object to vm.entries
          return entry;
        })//end map
      })
      .catch(function (error) {
        console.log('Error getting entries:', error);
      })//end $http
  }//end getEntries

  vm.deleteEntry = function (entryToDelete) {
    console.log(entryToDelete)
    $http.delete('/entries',
      {
        params: { id: entryToDelete.id }
      })
      .then(function () {
        console.log('Back from /entries DELETE: SUCCESS!');
        //refresh table display
        vm.getEntries();
      })
      .catch(function (error) {
        console.log('Error deleting item:', error);
      })//end $http
  }//end deleteEntry

  //call getEntries on page load
  vm.getEntries();

}])//end EntriesController