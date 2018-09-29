app.controller('ReportsController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
  let vm = this;
  vm.summaryData = [];
  vm.taskData = [];

  vm.getChartData = function () {
    console.log('in getChartData');
    
    //GET request for project id, project names, durations for summary chart
    $http.get('/reports/projects')
      .then(function(response) {
        console.log('back from /reports/projects with', response.data);
        vm.summaryData = response.data;
      })
      .catch(function(error) {
        console.log('Error getting summary data:', error);
      });//end summary GET

    //GET request for task id, task name, durations, project name, and dates for task chart
    $http.get('/reports/tasks')
      .then(function (response) {
        console.log('back from /reports/tasks with', response.data);
        vm.taskData = response.data;
        vm.taskData.forEach( (task) => {
          testChart.data.labels.push(task.name);
          testChart.data.datasets[0].data.push(
            moment.duration(task.duration).asHours().toFixed(2)
          );
        })
        console.log(testChart.data.labels, testChart.data.datasets[0].data)
      })
      .catch(function (error) {
        console.log('Error getting summary data:', error);
      });//end summary GET
  }//end getChartData


//initialize chart.JS display
  let ctx = document.getElementById('testChart');
  let testChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], //populate with project names
      datasets: [{
        label: 'hours',
        data: [], //populate with durations
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ], //dynamically generate colors based on number of distinct projects (from projects GET data) with palette.js
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ], //use same color list with 100% opacity
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