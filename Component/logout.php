<?php
// Start a session
session_start();

// Destroy the session
session_destroy();

// Create a JSON response
$response = [
    'message' => 'You have been logged out successfully.'
];

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>