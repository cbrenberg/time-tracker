app.controller('ReportsController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
  let vm = this;
  vm.summaryData = [];
  vm.taskData = [];

  vm.getChartData = function () {
    console.log('in getChartData');

    //GET request for project id, project names, durations for summary chart
    $http.get('/reports/projects')
      .then(function (response) {
        console.log('back from /reports/projects with', response.data);
        vm.summaryData = response.data;

        //generate color palette based on length of returned object
        var barColors = palette('mpn65', vm.summaryData.length).map((color) => {
          color = '#' + color;
          return color;
        });
        console.log('barColors:', barColors);
        

        //assign new color list to chart
        vm.testChart.data.datasets[0].backgroundColor = barColors.map(function (color) {
          return hexToRgba(color, 0.2);;
        });//end backgroundColors map;
        console.log('backgroundColor:', vm.testChart.data.datasets[0].backgroundColor);



        //assign border colors
        vm.testChart.data.datasets[0].borderColor = barColors.map(function (color) {
          return hexToRgba(color);
        });//end borderColors map

        //assign colors for tooltip colorbox
        vm.testChart.data.datasets[0].pointStrokeColor = vm.testChart.data.datasets[0].borderColor;

        //assign hover colors
        vm.testChart.data.datasets[0].hoverBackgroundColor = barColors.map(function (color) {
          return hexToRgba(color, 0.5);
        });//end borderColors map

        vm.summaryData.forEach((project) => {
          vm.testChart.data.labels.push(project.name);
          vm.testChart.data.datasets[0].data.push(
            moment.duration(project.duration).asHours().toFixed(2)
          );
        })
      })
      .catch(function (error) {
        console.log('Error getting summary data:', error);
      });//end summary GET

    //GET request for task id, task name, durations, project name, and dates for task chart
    $http.get('/reports/tasks')
      .then(function (response) {
        console.log('back from /reports/tasks with', response.data);
        vm.taskData = response.data;
        // vm.taskData.forEach( (task) => {
        //   testChart.data.labels.push(task.name);
        //   testChart.data.datasets[0].data.push(
        //     moment.duration(task.duration).asHours().toFixed(2)
        //   );
        // })
      })
      .catch(function (error) {
        console.log('Error getting summary data:', error);
      });//end summary GET
  }//end getChartData


  //initialize chart.JS display
  vm.ctx = document.getElementById('testChart');
  vm.testChart = new Chart(vm.ctx, {
    type: 'bar',
    data: {
      labels: [], //populate with project names
      datasets: [{
        label: 'hours',
        data: [], //populate with durations
        backgroundColor: [], //dynamically generated colors based on number of distinct projects (from projects GET data) with palette.js
        borderColor: [], //use same color list with 100% opacity
        hoverBackgroundColor: [],
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
  });

  //get chart data on view load
  vm.getChartData();
}]);