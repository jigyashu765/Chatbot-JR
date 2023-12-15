<?php

include 'connect.php';

$userInput = mysqli_real_escape_string($conn, $_POST['userInput']);
$userDefineReply = mysqli_real_escape_string($conn, $_POST['userReply']);

$sql = "INSERT INTO define_message_reply (messages, replies) VALUES ('$userInput', '$userDefineReply')";

if (mysqli_query($conn, $sql)) {
    $response = array('message' => 'Reply saved successfully.');
    echo json_encode($response);
} else {
    $response = array('message' => 'Error: ' . mysqli_error($conn));
    echo json_encode($response);
}

mysqli_close($conn);
?>
