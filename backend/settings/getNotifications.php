<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];

  $query = "
    SELECT * FROM notifications_tbl WHERE id_user = $userId
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($result !== false) {
    $response->data = new stdClass();
    $response->data->notifications = $result;

    echo json_encode($response);
    exit;
  }

  $response->data = new stdClass();
  $response->data->notifications = [];

  echo json_encode($response);

?>