<?php

  require "../db.php";
  $response = new stdClass();

  $convoId = $_POST["convoId"];

  $messages = [];

  $query = "
    SELECT * FROM messages_tbl WHERE id_convo = $convoId
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($result !== false) {
    foreach($result as $res) {
      array_push($messages, $res);
    }
  }
  
  $response->data = new stdClass();
  $response->data->messages = $messages;

  echo json_encode($response);

?>