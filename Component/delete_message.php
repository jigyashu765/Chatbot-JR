<?php
include 'connect.php';

$userInput = mysqli_real_escape_string($conn, $_POST['userInput']);

// Corrected SQL statement for deleting a record
$sql = "DELETE FROM undefine_reply_message WHERE messages = '$userInput'";

if (mysqli_query($conn, $sql)) {
    $response = array('message' => 'Record deleted successfully.');
    echo json_encode($response);
} else {
    $response = array('message' => 'Error: ' . mysqli_error($conn));
    echo json_encode($response);
}

mysqli_close($conn);
?>
