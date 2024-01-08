<?php
// Include your database connection or any necessary configuration
include('db_connection.php');

// Check if the $conn variable is defined
if (!isset($conn)) {
    // Provide a JSON response with an error message
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection error']);
    exit(); // Terminate script execution
}

// Fetch user data
$sql = "SELECT * FROM users"; // Replace 'users' with your actual table name
$result = $conn->query($sql);

// Check for errors
if (!$result) {
    // Provide a JSON response with an error message
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database query error: ' . $conn->error]);
    exit(); // Terminate script execution
}

// Fetch the result
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// Output JSON
header('Content-Type: application/json');
echo json_encode($users);

// Close the connection
$conn->close();
?>