<?php
// Include your database connection or any necessary configuration
include('db_connection.php');

// Fetch total number of employees
$sql = "SELECT COUNT(*) as total_employees FROM users"; // Change 'users' to your actual table name
$result = $conn->query($sql);

// Check for errors
if (!$result) {
    die("Error: " . $conn->error);
}

// Fetch the result
$row = $result->fetch_assoc();
$totalEmployees = $row['total_employees'];

// Output the total number of employees
echo $totalEmployees;

// Close the connection
$conn->close();
?>