<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    include 'connect.php';

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Step 2: Retrieve Form Data
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];

    // Step 3: Sanitize and Validate Data (You should improve data validation)
    $name = mysqli_real_escape_string($conn, $name);
    $username = mysqli_real_escape_string($conn, $username);
    $email = mysqli_real_escape_string($conn, $email);
    $phone = mysqli_real_escape_string($conn, $phone);
    $password = mysqli_real_escape_string($conn, $password);

    // Step 4: Insert Data into the Database
    $password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users_registration (name, username, email, phone, password) VALUES ('$name', '$username', '$email', '$phone', '$password')";


    if ($conn->query($sql) === TRUE) {
        $response = array('message' => 'Hello ' . $name . ', you have been registered successfully.');
        echo json_encode($response);
    } else {
        echo json_encode(['message' => 'Error: ' . $sql . "<br>" . $conn->error]);
    }

    
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response);

}
