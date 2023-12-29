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

// Fetch user data
$sql = "SELECT * FROM users"; // Replace 'users' with your actual table name
$result = $conn->query($sql);

// Convert the result to JSON
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