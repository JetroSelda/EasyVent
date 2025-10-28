<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];

  $query = "
    SELECT *
    FROM services_tbl servctbl, user_providers_tbl userptbl
    WHERE userptbl.id_user = $userId AND userptbl.id_service = servctbl.id AND servctbl.status = 'Published'
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
  $response->data->services = $arr;

  echo json_encode($response);

?>