<?php

// Include your database connection or any necessary configuration
include('db_connection.php');

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    deleteEmployee($conn);
} else {
    // Invalid request method
    echo 'error';
}

// Function to delete an employee
function deleteEmployee($connection) {
    // Get the user ID from the request parameters
    $userId = $_GET['id']; // Change to $_POST if you are using POST method in your AJAX request

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
