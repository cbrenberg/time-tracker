app.controller('ProjectsController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
  let vm = this;
  vm.projectToAdd = {};
  vm.projects = [];
  vm.reverseSort = true;
  vm.orderByField = '';


  //add a new project
  vm.addProject = function () {
    console.log('In addProject');
    $http.post('/projects', {
      name: vm.projectToAdd.name
    })
      .then(function () {
        console.log('Project added');
        //clear inputs
        vm.projectToAdd = {};
        //refresh table
        vm.getProjects();
        //toast dialog
        $mdToast.show($mdToast.simple().textContent('Project successfully added'));
      })
      .catch(function (err) {
        console.log('Error adding project:', err);
      })//end POST
  }//end addProject

  //get projects
  vm.getProjects = function () {
    console.log('in getProjects');
    $http.get('/projects')
    .then(function(response) {

      console.log(response.data);
      vm.projects = response.data.map(function (project) {
        //reformat duration as hours rounded to two decimal places and date as MM/DD/YYYY
        project.duration = moment.duration(project.duration).asHours();
        if (project.duration.toString().length > 3) {
          project.duration = project.duration.toFixed(2);
        }
        //append reformatted object to vm.entries
        return project;
      })//end map
    })
    .catch(function(error) {
      console.log('Error getting project list', error);
    })//end GET
  }//end getProjects

  //delete projects
  vm.deleteProject = function(projectToDelete) {
    console.log('in deleteProject');

    let confirm = $mdDialog.confirm()
      .title('Are you sure?')
      .textContent('This action cannot be undone')
      .ok('Yes, I\'m sure')
      .cancel('Cancel');

    let alert = $mdDialog.alert()
      .title("Error")
      .textContent('Sorry, projects with associated tasks cannot be deleted')
      .ok('Got it')

    $mdDialog.show(confirm)
      .then(function() {
        $http.delete('/projects',
          {
            params: { id: projectToDelete.id }
          })
          .then(function () {
            console.log('Back from /projects DELETE: SUCCESS!');
            //refresh table display
            vm.getProjects();
            //toast dialog
            $mdToast.show($mdToast.simple().textContent('Project successfully deleted'));
          })
          .catch(function (error) {
            console.log('Error deleting item:', error);
            $mdDialog.show(alert);
          })//end $http
      })//end $mdDialog
  }//end deleteProject


  //get project list on page load
  vm.getProjects();

}])//end Controller