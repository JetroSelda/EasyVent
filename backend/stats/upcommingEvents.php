<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];

  $query = "
    SELECT *
    FROM bookings_tbl booktbl, user_providers_tbl userptbl
    WHERE booktbl.id_service = userptbl.id_service AND userptbl.id_user = $userId AND booktbl.schedule > CURDATE()
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
  $response->data->bookings = $arr;

  echo json_encode($response);

?>