<?php

include 'connect.php';

$userInput = mysqli_real_escape_string($conn, $_POST['userInput']);

$sql = "INSERT INTO undefine_reply_message (messages) VALUES ('$userInput')";

if (mysqli_query($conn, $sql)) {
    $response = array('message' => 'Reply saved successfully.');
    echo json_encode($response);
} else {
    $response = array('message' => 'Error: ' . mysqli_error($conn));
    echo json_encode($response);
}

mysqli_close($conn);
?> 
