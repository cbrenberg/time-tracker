console.log('client.js loaded');

const app = angular.module('TimeTrackerApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/entries',
      {
        templateUrl: '../views/entries.html',
        controller: 'EntriesController as vm'
      })
    .when('/projects',
      {
        templateUrl: '../views/projects.html',
        controller: 'ProjectsController as vm'
      })
    .otherwise(
      { template: `<h2>404 Not Found</h2>` }
    );
}]);

