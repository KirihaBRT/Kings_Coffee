$(document).ready(function () {
    let currentContent = '';

    // Toggle sub-menus
    $('.sub-btn').click(function () {
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
    });

    // Function to handle pushing and pulling of content
    function toggleContent(contentType) {
      $('.content-link').removeClass('active'); // Remove active class from all links
      $(`.content-link[data-content="${contentType}"]`).addClass('active'); // Add active class to the clicked link

      // Hide the current visible content
      $('.page-content > div').filter(`.${currentContent.toLowerCase()}-content`).hide().removeClass('content-pulled');

      // Show the clicked content
      $(`.${contentType.toLowerCase()}-content`).show().addClass('content-pulled');

      // Update the current visible content
      currentContent = contentType;
    }

    // Toggle sidebar and content visibility
    $('.menu-btn').click(function () {
      $('.side-bar').addClass('active');
      $('.menu-btn').css("visibility", "hidden");
      $('.page-content > div').addClass('content-pulled');
      $('.table-container').css("width", "100%"); // Adjust the width when the sidebar is open
    });

    $('.close-btn').click(function () {
      $('.side-bar').removeClass('active');
      $('.menu-btn').css("visibility", "visible");
      $('.page-content > div').removeClass('content-pulled');
      $('.table-container').css("width", "100%"); // Set back to the default width when closing the sidebar
      currentContent = ''; // Reset the current visible content when closing the sidebar
    });

    // Handle content clicks
    $('.content-link').click(function (e) {
      e.preventDefault();
      const contentType = $(this).data('content');
      toggleContent(contentType);
    });

    // Sample data for the Orders table
    const Orders = [
      {
        dailySales: '₱500',
        weeklySales: '₱5000',
        monthlySales: '₱50000',
      },
      {
        dailySales: '₱500',
        weeklySales: '₱5000',
        monthlySales: '₱50000',
      },
      {
        dailySales: '₱500',
        weeklySales: '₱5000',
        monthlySales: '₱50000',
      },
    ];

    // Append rows to the Orders table
    Orders.forEach(order => {
      const tr = document.createElement('tr');
      const trContent = `
          <td>${order.dailySales}</td>
          <td>${order.weeklySales}</td>
          <td>${order.monthlySales}</td>
        `;
      tr.innerHTML = trContent;
      $('.recent-orders table tbody').append(tr);
    });

    // Function to add sample data to the menu table
    function addSampleMenuData() {
      const id = 'menu_1';
      const name = 'Caramel Macchiato';
      const price = 10.99;
      const category = 'Ice Blended';

      // Format the price with '₱' symbol
      const formattedPrice = '₱' + price.toFixed(2);

      // Append a new row to the menu table
      const newRow = $(`
        <tr data-id="${id}">
          <td>${id}</td>
          <td>${name}</td>
          <td>${formattedPrice}</td>
          <td>${category}</td>
          <td class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      `);

      $('.menu-table tbody').append(newRow);

      // Attach event handlers for the new buttons in the added row
      attachEventHandlers(newRow);
    }

    // Add sample data to both tables
    addSampleMenuData();

    // Function to display employees in the employee table
    function displayEmployees(employees) {
        const employeeTable = $('.employee-table tbody');
        // Clear existing content
        employeeTable.empty();

        // Iterate through employees and append rows to the table
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
            // Attach event handlers for the new buttons in the added row
            attachEventHandlers(newRow);
        });
    }

    // Fetch employees and display them
    function fetchAndDisplayEmployees() {
        fetch('includes/users.php') // Updated URL to the path of your PHP script (users.php)
            .then(response => response.json())
            .then(employees => {
                displayEmployees(employees);
            })
            .catch(error => console.error('Error:', error));
    }

    // Fetch employees and display them on page load
    fetchAndDisplayEmployees();


    //////////// OPEN AND CLOSE MODAL ////////////////

    // Function to open the modal
    function openModal(modalId) {
        $(`#${modalId}`).show();
    }

    // Function to close the modal
    function closeModal(modalId) {
        $(`#${modalId}`).hide();
    }

    // Event delegation for closing modals
    $(document).on('click', '.modal .close-modal', function () {
        const modalId = $(this).closest('.modal').attr('id');
        closeModal(modalId);
    });

    ////////////////// ADD EMPLOYEE MODAL/////////////////

    // Event delegation for "Add Employee" button
    $(document).on('click', '.add-btn-employee', function () {
        openModal('addEmployeeModal');
    });
    
    // Handle form submission for adding employee
    $(document).on('submit', '#addEmployeeForm', function (e) {
        e.preventDefault();

        const name = $('#addEmployeeName').val();
        const username = $('#addEmployeeUsername').val();
        const password = $('#addEmployeePassword').val();
        const role = $('#addEmployeeRole').val();

        // Define allowed roles
        const allowedRoles = ['Cashier', 'Manager', 'Admin'];

        if (name && username && password && allowedRoles.includes(role)) {
            // Perform an AJAX request to save the data to the database
            $.ajax({
                url: 'includes/add_employee.php', // Adjust the path accordingly
                method: 'POST',
                data: {
                    action: 'addEmployee',
                    name: name,
                    username: username,
                    password: password,
                    role: role
                },
                success: function (response) {
                    if (response === 'success') {
                        // If the server indicates success, update the UI
                        fetchAndDisplayEmployees(); // Fetch and display all employees

                        // Close the modal
                        closeModal('addEmployeeModal');

                        // Reset the form fields
                        $('#addEmployeeForm')[0].reset();
                    } else {
                        // Handle server response indicating an error
                        alert('Failed to add employee. Please try again.');
                    }
                },
                error: function (xhr, status, error) {
                    // Handle AJAX error and display more details
                    console.error('AJAX Error:', xhr.responseText);
                    alert('An error occurred. Please check the console for more details:\n' + xhr.responseText);
                }
            });
        } else {
            alert('Please fill in all fields and select a valid role.');
        }
    });


    ////////////// EDIT EMPLOYEE MODAL /////////////////

    // Function to handle edit button click for employee table
    $('.page-content').on('click', '.employee-table .edit-btn', function () {
        const row = $(this).closest('tr');
        const userId = row.data('id');
        openEmployeeModal(row, userId);
    });

    // Function to open the modal for editing employee data
    function openEmployeeModal(row, userId) {
        const name = row.find('td:eq(1)').text();
        const username = row.find('td:eq(2)').text();
        const password = row.find('td:eq(3)').text();
        const role = row.find('td:eq(4)').text();

        // Populate the modal form with the current data
        $('#editEmployeeName').val(name);
        $('#editEmployeeUsername').val(username);
        $('#editEmployeePassword').val(password);
        $('#editEmployeeRole').val(role);

        // Set the userID dynamically
        $('#editEmployeeForm').attr('data-user-id', userId);

        openModal('editEmployeeModal');
    }

    // Handle form submission for editing employee
    $(document).on('submit', '#editEmployeeForm', function (e) {
        e.preventDefault();

        const userId = $('#editEmployeeForm').attr('data-user-id'); // Get user ID from data attribute
        const name = $('#editEmployeeName').val();
        const username = $('#editEmployeeUsername').val();
        const password = $('#editEmployeePassword').val();
        const role = $('#editEmployeeRole').val();

        // Define allowed roles
        const allowedRoles = ['Cashier', 'Manager', 'Admin'];

        if (userId && name && username && password && allowedRoles.includes(role)) {
            // Perform an AJAX request to save the data to the database
            $.ajax({
                url: 'includes/edit_employee.php', // Adjust the path accordingly
                method: 'POST',
                data: {
                    action: 'editEmployee',
                    userId: userId,
                    name: name,
                    username: username,
                    password: password,
                    role: role
                },
                success: function (response) {
                    if (response === 'success') {
                        // If the server indicates success, update the UI or perform any necessary actions
                        fetchAndDisplayEmployees(); // Example: Fetch and display all employees

                        // Close the modal or perform any necessary actions
                        closeModal('editEmployeeModal');

                        // Reset the form fields or perform any necessary actions
                        $('#editEmployeeForm')[0].reset();
                    } else {
                        // Handle server response indicating an error
                        alert('Failed to edit employee. Please try again.');
                    }
                },
                error: function (xhr, status, error) {
                    // Handle AJAX error and display more details
                    console.error('AJAX Error:', xhr.responseText);
                    alert('An error occurred. Please check the console for more details.');
                }
            });
        } else {
            alert('Please fill in all fields and select a valid role.');
        }
    });

    ///////event handler////////

    // Function to attach event handlers for edit and delete buttons
    function attachEventHandlers(selector) {
        // Handle edit button click
        $(selector).find('.edit-btn').off().on('click', function () {
            const row = $(this).closest('tr');
            const userId = row.data('id');
            openEmployeeModal(row, userId);
        });

        // Handle delete button click
        function handleDeleteButtonClick(e, row, userId) {
            e.stopPropagation();
            const confirmationMessage = `Are you sure you want to delete row with ID ${userId}?`;

            // Set confirmation message and open the modal
            $('#confirmationMessage').text(confirmationMessage);
            openModal('confirmationModal');

            // Handle confirm delete button click
            $('#confirmDeleteBtn').off().on('click', function () {
                // Call the function to delete the employee
                employeeDeletionConfirmation(userId);
                closeModal('confirmationModal');
            });
        }

        // Event delegation for delete button in employee table
        $(selector).find('.delete-btn').off().on('click', function (e) {
            const row = $(this).closest('tr');
            const userId = row.data('id');
            handleDeleteButtonClick(e, row, userId);
        });

        // Event delegation for delete button in search results
        $('.page-content').off().on('click', '.employee-table .delete-btn', function (e) {
            const row = $(this).closest('tr');
            const userId = row.data('id');
            handleDeleteButtonClick(e, row, userId);
        });

        // Handle input event on search input for real-time filtering
        $('#searchInput').off().on('input', function () {
            const searchQuery = $(this).val().toLowerCase();
            filterEmployees(searchQuery);
        });

        // Handle input event on search input for real-time filtering (Menu)
        $('#searchInputMenu').off().on('input', function () {
            const searchQuery = $(this).val().toLowerCase();
            filterMenuItems(searchQuery);
        });

        // Function to delete the employee (redirects to delete_employee.php)
        function employeeDeletionConfirmation(userId) {
            // Perform an AJAX request to delete the employee
            $.ajax({
                url: 'includes/delete_employee.php', // Adjust the path accordingly
                method: 'POST',
                data: {
                    action: 'deleteEmployee',
                    userId: userId
                },
                success: function (response) {
                    if (response === 'success') {
                        // If the server indicates success, update the UI or perform any necessary actions
                        fetchAndDisplayEmployees(); // Example: Fetch and display all employees
                    } else {
                        // Handle server response indicating an error
                        alert('Failed to delete employee. Please try again.');
                    }
                },
                error: function (xhr, status, error) {
                    // Handle AJAX error and display more details
                    console.error('AJAX Error:', xhr.responseText);
                    alert('An error occurred. Please check the console for more details.');
                }
            });
        }
    }
    

    // Function to filter employees based on search query
    function filterEmployees(query) {
        // Your filtering logic here
        // For example, you can hide rows that don't match the search query

        $('.employee-table tbody tr').each(function () {
            const userId = $(this).data('id').toString();
            const name = $(this).find('td:eq(1)').text().toLowerCase();
            const username = $(this).find('td:eq(2)').text().toLowerCase();
            const role = $(this).find('td:eq(4)').text().toLowerCase();

            if (userId.includes(query) || name.includes(query) || username.includes(query) || role.includes(query)) {
                // Show the row if it matches the search query
                $(this).show();
            } else {
                // Hide the row if it doesn't match the search query
                $(this).hide();
            }
        });
    }


  });