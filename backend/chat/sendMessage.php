<?php

  require "../db.php";
  
  $response = new stdClass();

  $convoId = $_POST["convoId"];
  $senderId = $_POST["senderId"];
  $message = addslashes($_POST["message"]);

  $mutate = "
    INSERT INTO `messages_tbl`
      (`id_sender`, `id_convo`, `message`)
    VALUES
      ($senderId, $convoId, '$message')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  
  $response->data = new stdClass();
  $response->data->message = $message;

  echo json_encode($response);


?>