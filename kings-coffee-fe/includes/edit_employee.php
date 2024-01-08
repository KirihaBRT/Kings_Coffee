<?php

// Include your database connection or any necessary configuration
include('db_connection.php');

// Check if the action is set and is 'editEmployee'
if (isset($_POST['action']) && $_POST['action'] === 'editEmployee') {
    editEmployee($conn);
} else {
    // Invalid action
    echo 'error';
}

// Function to edit an employee
function editEmployee($connection) {
    // Get the form data
    $userId = $_POST['userId'];
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Validate the form data (you should add more robust validation)
    if (empty($userId) || empty($name) || empty($username) || empty($password) || empty($role)) {
        echo 'error';
        exit;
    }

    // Perform database update using prepared statements
    // Note: Replace 'your_table_name' and column names with the actual table and column names in your database

    // Prepare the statement
    $stmt = $connection->prepare("UPDATE users SET name = ?, username = ?, password = ?, role = ? WHERE userID = ?");

    // Bind parameters
    $stmt->bind_param("ssssi", $name, $username, $password, $role, $userId);

    // Execute the statement
    if ($stmt->execute()) {
        echo 'success';
    } else {
        echo 'error';
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();

?>