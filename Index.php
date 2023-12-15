<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JR - A ChatBot</title>
    <link rel="stylesheet" href="style.css?vm<?php echo time(); ?>">
    <link rel="shortcut icon" href="./image/Chatbot  (Large).png" type="image/x-icon" />
</head>

<body>
    <div class="container">
        <div class="cheatCode" id="cheatCode">
            <h2>Instruction Eg.</h2>
            <?php

            include './Component/connect.php';
            
            $sql = "SELECT * FROM instruction_table";
            
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo '<hr>';
                    echo '<p>' . $row["Instruction"] . '</p>';
                }
            } else {
                echo "No records found";
            }
            ?>
        </div>
        <div class="box">
            <div id="conversation">
                <!-- JR's (Chatbot's) Message -->
                <div class="JR-Message chat">
                    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
                    <div class="buttons">
                        <p>👋 Hello there! I'm JR - A ChatBot. 😊 For an enhanced and memorable conversation, why not consider <a href="javascript:void(0);" onclick="loggin()">logging</a> in or <a href="javascript:void(0);" onclick="signingUp()">signing up</a>? It's the key to unlocking a world of personalized interactions and fantastic features!</p>
                    </div>
                </div>

                <!-- User Message -->
                <!-- <div class="User-Message chat">
                <p>Hello 👋, I am User! As Tester. <br> I am testing You...</p>
                <img src="./image/Chatbot  (Small).png" alt="User" class="profile-pic pic-right">
            </div> -->
            </div>
        </div>
        <div class="cheatCode" id="cheatCode">
            <h2>New Keyword</h2>
            <?php

                include './Component/connect.php';

                $sql = "SELECT * FROM instruction_table ORDER BY Instruction ASC LIMIT 15";

                $result = mysqli_query($conn, $sql);

                if ($result) {
                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo '<hr>';
                            echo '<p>' . $row["Instruction"] . '</p>';
                        }
                    } else {
                        echo "No records found";
                    }
                } else {
                    echo 'Error: ' . mysqli_error($conn);
                }

                mysqli_close($conn);
            ?>

        </div>
    </div>
    <div class="inputBox">
        <input id="messageInput" type="text" maxlength="150" placeholder="Enter Your Message Here..." autofocus>
        <button type="button" id="sendBtn" class="button-70">Send</button>
    </div>
</body>
<script type="module" src="scripts.js?vm<?php echo time(); ?>"></script>

</html>