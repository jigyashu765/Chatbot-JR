<?php
include 'connect.php';

$replyId = mysqli_real_escape_string($conn, $_POST['replyId']);

// Corrected SQL statement for deleting a record
$sql = "DELETE FROM define_reply_message WHERE Id = '$replyId'";

if (mysqli_query($conn, $sql)) {
    $response = array('message' => 'Record deleted successfully.');
    echo json_encode($response);
} else {
    $response = array('message' => 'Error: ' . mysqli_error($conn));
    echo json_encode($response);
}

mysqli_close($conn);
?>
