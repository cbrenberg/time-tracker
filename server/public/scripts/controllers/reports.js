app.controller('ReportsController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
  let vm = this;
  vm.projectData = [];
  vm.taskData = [];

  vm.chartData = {
    type: 'bar',
    data: {
      labels: [], //populate with project names
      datasets: [{
        label: 'hours',
        data: [], //populate with durations
        backgroundColor: [], //dynamically generated colors based on number of distinct projects (from projects GET data) with palette.js
        borderColor: [], //use same color list with 100% opacity
        hoverBackgroundColor: [], //same colors with 50% opacity
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  }//end chartData

  vm.getAllChartData = function () {
    //GET request for task id, task name, durations, project name, and dates for task chart
    $http.get('/reports/tasks')
      .then(function (response) {
        console.log('back from /reports/tasks with', response.data);
        vm.taskData = response.data;
      })//end THEN
      .catch(function (error) {
        console.log('Error getting task data:', error);
      });//end task GET

    //GET request for project id, project names, durations for summary chart
    $http.get('/reports/projects')
      .then(function (response) {
        console.log('back from /reports/projects with', response.data);
        vm.projectData = response.data;
        //create color palette from response data
        vm.createColorPalette();
        vm.renderProjectChart();
      })//end THEN
      .catch(function (error) {
        console.log('Error getting project data:', error);
      });//end summary GET

  }//end getAllChartData

  vm.createColorPalette = function () {
    //generate color palette based on length of returned object
    vm.barColors = palette('mpn65', vm.projectData.length).map((color) => {
      color = '#' + color;
      return color;
    });
    console.log('vm.barColors:', vm.barColors);

    //assign new color list to chart object
    vm.chartData.data.datasets[0].backgroundColor = vm.barColors.map(function (color) {
      return hexToRgba(color, 0.2);;
    });//end backgroundColors map;
    console.log('backgroundColor:', vm.chartData.data.datasets[0].backgroundColor);

    //assign border colors
    vm.chartData.data.datasets[0].borderColor = vm.barColors.map(function (color) {
      return hexToRgba(color);
    });//end borderColors map

    //assign hover colors
    vm.chartData.data.datasets[0].hoverBackgroundColor = vm.barColors.map(function (color) {
      return hexToRgba(color, 0.5);
    });//end borderColors map
  }//end createColorPalette

  vm.renderProjectChart = function () {
    //append canvas to DOM when tab is clicked for proper chart rendering
    let el = document.getElementById('projectChartContainer');
    angular.element(el).empty().append(`<h2>Time Spent By Project</h2><canvas id="projectChart"></canvas>`)

    //clear and reassign chart data object before render
    vm.chartData.data.datasets[0].data = [];
    vm.chartData.data.labels = [];

    vm.projectData.forEach((project) => {
      vm.chartData.data.labels.push(project.name);
      vm.chartData.data.datasets[0].data.push(
        moment.duration(project.duration).asHours().toFixed(2)
      );
    })//end summarData.forEach

    //initialize chart.JS display
    vm.ctx = document.getElementById('projectChart');
    let projectChart = new Chart(vm.ctx, vm.chartData);
  };//end renderProjectChart

  vm.renderTaskChart = function () {
    //append canvas to DOM when tab is clicked for proper chart rendering
    let el = document.getElementById('taskChartContainer');
    angular.element(el).empty().append(`<h2>Time Spent By Task</h2><canvas id="taskChart"></canvas>`);

    //clear and reassign chart data object before render
    vm.chartData.data.datasets[0].data = [];
    vm.chartData.data.labels = [];

    vm.taskData.forEach((task) => {
      vm.chartData.data.labels.push(task.name);
      vm.chartData.data.datasets[0].data.push(
        moment.duration(task.duration).asHours().toFixed(2)
      );
    })//end summarData.forEach

    // --------------------------------------
    //add date axis manipulation here
    // --------------------------------------


    //render chart.JS display on DOM
    vm.ctx = document.getElementById('taskChart');
    let taskChart = new Chart(vm.ctx, vm.chartData);
  }

  //get all data on page load and generate color palettes
  vm.getAllChartData();

  
}]);