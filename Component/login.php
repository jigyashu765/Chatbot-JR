<?php
// Start a session
session_start();

// Include your database connection code here
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password']; // Password should be hashed in a real application

    // Modify your SQL query to include the "password" column
    $sql = "SELECT * FROM users_registration WHERE username = '$username' AND password IS NOT NULL";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        
        // Ensure that the "password" column is being retrieved correctly
        if (isset($row['password'])) {
            $hashedPassword = $row['password'];

            // Verify the password using password_verify()
            if (password_verify($password, $hashedPassword)) {
                $_SESSION['username'] = $username; // Start a session for the user
                $response = [
                    'message' => 'Hello ' . $username . ', you have been logged in successfully.'
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $loginError = "Incorrect username or password.";
            }
        } else {
            $loginError = "User does not exist.";
        }
    } else {
        // User does not exist
        $loginError = "User does not exist.";
    }
}

header('Content-Type: application/json');
?>
