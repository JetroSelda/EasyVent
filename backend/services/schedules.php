<?php

  require "../db.php";
  
  $response = new stdClass();
  $userId = $_POST["userId"];

  $query = "
    SELECT servctbl.property_name, bktbl.schedule, servctbl.id, ustbl.personal_name, ustbl.last_name
    FROM user_providers_tbl usertbl, services_tbl servctbl, bookings_tbl bktbl, users_tbl ustbl
    WHERE usertbl.id_user = $userId AND servctbl.id = usertbl.id_service AND bktbl.id_service = servctbl.id AND bktbl.status in ('Confirmed', 'Paid') AND bktbl.id_user = ustbl.id
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
  $response->data->schedules = $arr;

  echo json_encode($response);

?>