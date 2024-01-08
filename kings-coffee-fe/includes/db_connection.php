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
?>