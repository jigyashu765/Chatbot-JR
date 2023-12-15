<?php

include 'connect.php';

$userMessage = $_POST['userMessage'];

$sql = "SELECT replies FROM define_message_reply WHERE messages = '$userMessage'";
$result = mysqli_query($conn, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $reply = $row['replies'];
    echo json_encode(['reply' => $reply]);

} else {

    echo json_encode(['reply' => 'Sorry, an error occurred.']);
}

mysqli_close($conn);

?>
