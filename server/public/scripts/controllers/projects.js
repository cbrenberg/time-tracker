app.controller('ProjectsController', ['$http', function($http) {
  let vm = this;
  vm.projectToAdd = {};
  vm.projects = [];

  vm.addProject = function () {
    console.log('In addProject');
    $http.post('/projects', {
      name: vm.projectToAdd.name
    })
    .then(function() {
      console.log('Project added');
      // vm.getProjects();
    })
    .catch(function(err) {
      console.log('Error adding project:', err);
    })//end $http
  }//end addProject
}])//end Controller