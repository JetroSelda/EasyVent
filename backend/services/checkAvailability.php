<?php

  require "../db.php";
  
  $response = new stdClass();

  $serviceId = $_POST["serviceId"];

  $query = "
    SELECT
      bookings.id,
      bookings.schedule
    FROM `bookings_tbl` bookings
    WHERE bookings.id_service = $serviceId AND bookings.status IN ('Payment Verification', 'Confirmed', 'Paid', 'Completed');
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