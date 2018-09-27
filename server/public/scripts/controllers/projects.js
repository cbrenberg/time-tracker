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


  //get project list on page load
  vm.getProjects();

}])//end Controller