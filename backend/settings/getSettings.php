<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT * FROM settings_tbl LIMIT 1
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetch(PDO::FETCH_ASSOC);

  if ($result !== false) {
    $response->data = new stdClass();
    $response->data->settings = $result;

    echo json_encode($response);
    exit;
  }

  $response->data = new stdClass();
  $response->data->settings = new stdClass();

  echo json_encode($response);

?>