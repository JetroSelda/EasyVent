<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT * FROM feedbacks_tbl ORDER BY id DESC
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($result !== false) {
    $response->data = new stdClass();
    $response->data->feedbacks = $result;

    echo json_encode($response);
    exit;
  }

  $response->data = new stdClass();
  $response->data->feedbacks = [];

  echo json_encode($response);

?>