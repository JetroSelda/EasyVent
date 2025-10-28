<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];
  $startMonth = $_POST["startMonth"];
  $lastMonth = $_POST["lastMonth"];

  $query = "
    SELECT booktbl.*, servctbl.property_name, servctbl.id as 'id_service'
    FROM bookings_tbl booktbl, user_providers_tbl userptbl, services_tbl servctbl
    WHERE
        booktbl.id_service = userptbl.id_service AND
        userptbl.id_service = servctbl.id AND
        userptbl.id_user = $userId AND
        booktbl.schedule BETWEEN '$startMonth' AND '$lastMonth'
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