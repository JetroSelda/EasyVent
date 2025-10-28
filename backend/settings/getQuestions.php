<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT * FROM quick_messages_tbl WHERE status = 'Active'
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($result !== false) {
    $response->data = new stdClass();
    $response->data->questions = $result;

    echo json_encode($response);
    exit;
  }

  $response->data = new stdClass();
  $response->data->questions = [];

  echo json_encode($response);

?>