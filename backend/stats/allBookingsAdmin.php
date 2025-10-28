<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT booktbl.*, servc.id as 'id_service', servc.property_name
    FROM bookings_tbl booktbl, user_providers_tbl userptbl, services_tbl servc
    WHERE booktbl.id_service = userptbl.id_service AND userptbl.id_service = servc.id
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