<?php

// Include your database connection or any necessary configuration
include('db_connection.php');

// Check if the action is set and is 'addEmployee'
if (isset($_POST['action']) && $_POST['action'] === 'addEmployee') {
    // Get the form data
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Validate the form data (you should add more robust validation)
    if (empty($name) || empty($username) || empty($password) || empty($role)) {
        echo 'error';
        exit;
    }

    // Generate a unique integer user ID
    $uniqueUserId = generateUniqueUserId($conn);

    // Perform database insertion using prepared statements
    // Note: Replace 'your_table_name' and column names with the actual table and column names in your database

    // Prepare the statement
    $stmt = $conn->prepare("INSERT INTO users (userID, name, username, password, role) VALUES (?, ?, ?, ?, ?)");

    // Bind parameters
    $stmt->bind_param("issss", $uniqueUserId, $name, $username, $password, $role);

    // Execute the statement
    if ($stmt->execute()) {
        echo 'success';
    } else {
        echo 'error';
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Invalid action
    echo 'error';
}

// Function to generate a unique integer user ID
function generateUniqueUserId($connection) {
    $uniqueUserId = mt_rand(1000, 9999); // Adjust the range as needed

    // Check if the generated ID already exists in the database
    $stmt = $connection->prepare("SELECT userID FROM users WHERE userID = ?");
    $stmt->bind_param("s", $uniqueUserId);
    $stmt->execute();
    $stmt->store_result();

    // If the ID already exists, generate a new one
    while ($stmt->num_rows > 0) {
        $uniqueUserId = mt_rand(1000, 9999); // Adjust the range as needed
        $stmt->execute();
        $stmt->store_result();
    }

    // Close the statement
    $stmt->close();

    return $uniqueUserId;
}

?>