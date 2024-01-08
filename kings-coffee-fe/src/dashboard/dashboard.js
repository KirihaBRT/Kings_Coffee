$(document).ready(function() {
    fetchAndDisplayTotalEmployees();
  });
  
  /**
   * Fetch and display employees using a GET request to the 'list' endpoint.
   */
  function fetchAndDisplayTotalEmployees() {
    requestCall('user', 'GET', 'list', null, null, function(employees) {
      displayTotalEmployees(employees);
    });
  }
  
  // Function to fetch total employees and update the dashboard
  function displayTotalEmployees(employees) {
    const totalEmployees = employees.length;
    $('#totalEmployeesDashboard').text(totalEmployees);
  }