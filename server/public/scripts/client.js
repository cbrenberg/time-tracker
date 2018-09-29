console.log('client.js loaded');

const app = angular.module('TimeTrackerApp', ['ngRoute', 'ngMaterial', 'ngMessages'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('deep-orange')
      .warnPalette('amber')
      .backgroundPalette('grey');
  });;

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/',
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
      { templateUrl: '../views/reports.html',
        controller: 'ReportsController as vm'
      }
    );
}]);