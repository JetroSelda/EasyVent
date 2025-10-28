<?php

  require "../db.php";
  $response = new stdClass();

  $userId = $_POST["userId"];

  $query = "
    SELECT booktbl.*, usertbl.personal_name, usertbl.last_name, usertbl.email, servc.property_name
    FROM bookings_tbl booktbl, user_providers_tbl userptbl, users_tbl usertbl, services_tbl servc
    WHERE booktbl.id_service = userptbl.id_service AND userptbl.id_user = $userId AND booktbl.id_user = usertbl.id AND servc.id = userptbl.id_service
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