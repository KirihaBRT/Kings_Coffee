<?php

// Database connection details
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'dbkc';

// Create a connection
$conn = new mysqli($host, $user, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the action is set and is 'deleteEmployee'
if (isset($_POST['action']) && $_POST['action'] === 'deleteEmployee') {
    deleteEmployee($conn);
} else {
    // Invalid action
    echo 'error';
}

// Function to delete an employee
function deleteEmployee($connection) {
    // Get the user ID from the POST data
    $userId = $_POST['userId'];

    // Validate the user ID (you should add more robust validation)
    if (empty($userId)) {
        echo 'error';
        exit;
    }

    // Perform database deletion using prepared statements
    // Note: Replace 'your_table_name' and column names with the actual table and column names in your database

    // Prepare the statement
    $stmt = $connection->prepare("DELETE FROM users WHERE userID = ?");

    // Bind parameter
    $stmt->bind_param("s", $userId);

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
