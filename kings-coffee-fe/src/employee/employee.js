/**
 * Execute the fetchAndDisplayEmployees function when the document is ready to ensure the DOM is fully loaded before fetching and displaying employee data.
 */
$(document).ready(function() {
  fetchAndDisplayEmployees();
});

/**
 * Display the provided array of employees in the HTML table.
 * @param employees - An array of employee objects with properties like userID, name, username, password, and role.
 */
function displayEmployees(employees) {
  const employeeTable = $('.employee-table tbody');
  employeeTable.empty();

  employees.forEach(employee => {
    const newRow = $(`
      <tr data-id="${employee.userID}">
        <td>${employee.userID}</td>
        <td>${employee.name}</td>
        <td>${employee.username}</td>
        <td>${employee.password}</td>
        <td>${employee.role}</td>
        <td class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      </tr>
    `);
    employeeTable.append(newRow);
  });
}

/**
 * Fetch and display employees using a GET request to the 'list' endpoint.
 */
function fetchAndDisplayEmployees() {
  requestCall('user', 'GET', 'list', null, null, displayEmployees);
}

/**
 * Opens a modal to edit employee details based on the selected row and user ID.
 * Retrieves data from the specified row and populates the modal form fields.
 * @param row - The jQuery object representing the selected table row.
 * @param userId - The unique identifier of the employee.
 */
function openEmployeeModal(row, userId) {
  const name = row.find('td:eq(1)').text();
  const username = row.find('td:eq(2)').text();
  const password = row.find('td:eq(3)').text();
  const role = row.find('td:eq(4)').text();

  $('#employeeId').val(userId);
  $('#employeeName').val(name);
  $('#employeeUsername').val(username);
  $('#employeePassword').val(password);
  $('#employeeRole').val(role);

  $('#employeeModal').modal('show');
}

/**
 * Event listener for the click on the 'Add Employee' button.
 * Clears input fields in the employee modal and opens the modal for adding a new employee.
 */
$(document).on('click', '.add-btn-employee', function () {
  $("#employeeModal input").val(null);
  $('#employeeModal').modal('toggle');
});

/**
 * Event listener for the click on the 'Execute' button.
 * Gathers data from the employee form fields, validates input, and performs a POST or PUT request accordingly.
 */
$(document).on('click', '.btn-execute', function () {
  // Collect data from the employee form fields
  var formData = {
    "id": $("#employeeId").val(),
    "name": $("#employeeName").val(),
    "username": $("#employeeUsername").val(),
    "password": $("#employeePassword").val(),
    "role": $("#employeeRole").val()
  };

  const allowedRoles = ['Cashier', 'Manager', 'Admin'];
  if (formData.name && formData.username && formData.password && allowedRoles.includes(formData.role)) {
    // Determine whether to send a POST (create) or PUT (update) request based on the presence of an employee ID
    if (!formData.id) {
       // If no employee ID is provided, initiate a POST request to create a new user
      requestCall('user', 'POST', 'create', formData, null, requestResponseExecute);
    } else {
      // If an employee ID is provided, initiate a PUT request to update an existing user
      requestCall('user', 'PUT', 'update', formData, null, requestResponseExecute);
    }
    
  } else {
    alert('Please fill in all fields and select a valid role.');
  }
});

/**
 * Handles the response after a successful execution of a user creation or update request.
 * Displays a success alert, updates the displayed employees, and closes the employee modal.
 * @param response - The response object from the server.
 */
function requestResponseExecute() {
  fetchAndDisplayEmployees();
  $('#employeeModal').modal('toggle');
}

 /**
 * Event listener for the click on the 'Edit' button within the employee table.
 * Retrieves the selected row and user ID, then opens the employee modal for editing.
 */
$(document).on('click', '.employee-table .edit-btn', function () {
    const row = $(this).closest('tr');
    const userId = row.data('id');
    openEmployeeModal(row, userId);
});

/**
 * Event listener for the click on the 'Delete' button within the employee table.
 * Prompts the user for confirmation and then initiates a DELETE request to remove the selected employee.
 */
$(document).on('click', '.employee-table .delete-btn', function () {
  const row = $(this).closest('tr');
  const userId = row.data('id');

  // Prompt the user for confirmation using the modal
  $('#deleteModal').modal('show');
  
  // Set the text content of the modal for confirmation
  $('.modal-body p').html(`Are you sure you want to delete the employee with ID<strong> ${userId}?</strong>`);

  // Set up the click event for the "Delete" button within the delete confirmation modal
  $('#confirmDelete').off('click').on('click', function () {
      // AJAX request to delete the employee
      $.ajax({
          type: "DELETE",
          url: `includes/delete_employee.php?id=${userId}`, // Adjust the URL to your server-side script
          success: function (response) {
              // Handle success, e.g., refresh the page or update the UI
              $('#deleteModal').modal('hide'); // Hide the delete confirmation modal
              fetchAndDisplayEmployees(); // Refresh the displayed employees
          },
          error: function (error) {
              // Handle error, e.g., display an error message
              console.error("Error deleting record: ", error);
          }
      });
  });
});