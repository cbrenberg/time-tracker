app.controller('ProjectsController', ['$http', function ($http) {
  let vm = this;
  vm.projectToAdd = {};
  vm.projects = [];


  //add a new project
  vm.addProject = function () {
    console.log('In addProject');
    $http.post('/projects', {
      name: vm.projectToAdd.name
    })
      .then(function () {
        console.log('Project added');
        // vm.getProjects();
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
      vm.projects = response.data;
    })
    .catch(function(error) {
      console.log('Error getting project list', error);
    })//end GET
  }//end getProjects

  //delete projects


  //get project list on page load
  vm.getProjects();

}])//end Controller