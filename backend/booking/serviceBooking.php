<?php

  require "../db.php";
  
  $response = new stdClass();

  $serviceId = $_POST["serviceId"];

  $query = "
    SELECT
      bookings.id,
      bookings.package_item,
      bookings.status,
      customer.personal_name,
      customer.last_name,
      customer.email,
      customer.display_picture,
      customer.contacts,
      customer.id as 'id_customer',
      bookings.reason
    FROM `bookings_tbl` bookings, `users_tbl` customer
    WHERE bookings.id_service = $serviceId AND customer.id = bookings.id_user
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