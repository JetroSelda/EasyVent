<?php

  require "../db.php";
  
  $response = new stdClass();
  $serviceId = $_POST["serviceId"];

  $query = "
    SELECT
      ctbl.id,
      ctbl.rating,
      ctbl.comment,
      ctbl.created_at,
      utbl.personal_name,
      utbl.last_name
    FROM comments_tbl ctbl, users_tbl utbl
    WHERE ctbl.id_service = $serviceId AND ctbl.id_user = utbl.id
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $arr = [];

  if ($result !== false) {
    foreach($result as $res) {
      array_push($arr, $res);
    }
  }

  $response->data = new stdClass();
  $response->data->comments = $arr;

  echo json_encode($response);


?>