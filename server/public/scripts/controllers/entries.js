// MODULE OUT INTO ENTRIES CONTROLLER
app.controller('EntriesController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast, ) {
  let vm = this;
  vm.entryToAdd = {};
  vm.entries = [];
  vm.projects = [];
  vm.orderByField = '';
  vm.reverseSort = false;

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
        //clear inputs
        vm.entryToAdd = {};
        //refresh table after adding new entry
        vm.getEntries();
        //toast dialog
        $mdToast.show($mdToast.simple().textContent('Task successfully added'));
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

    let confirm = $mdDialog.confirm()
      .title('Are you sure?')
      .textContent('This action cannot be undone')
      .ok('Yes, I\'m sure')
      .cancel('Cancel');

    $mdDialog.show(confirm)
      .then(function () {

        $http.delete('/entries',
          {
            params: { id: entryToDelete.id }
          })
          .then(function () {
            console.log('Back from /entries DELETE: SUCCESS!');
            //refresh table display
            vm.getEntries();
            //toast dialog
            $mdToast.show($mdToast.simple().textContent('Task successfully deleted'));
          })
          .catch(function (error) {
            console.log('Error deleting item:', error);
          })//end $http
      })//end $mdDialog
  }//end deleteEntry

  //get project names to populate select options
  vm.getProjects = function () {
    console.log('in getProjects');
    $http.get('/entries/projects')
      .then(function (response) {
        console.log(response.data);
        vm.projects = response.data;
      })
      .catch(function (error) {
        console.log('Error getting project list', error);
      })//end GET
  }//end getProjects

  vm.sortBy = function(column) {
    vm.orderByField = column; 
    vm.reverseSort = !vm.reverseSort;
  }
  

  //call getEntries on page load
  vm.getEntries();
  vm.getProjects();

}])//end EntriesController