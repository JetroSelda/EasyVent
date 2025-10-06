<?php

  require "../db.php";

  $userId = $_POST["userId"];
  $serviceId = $_POST["serviceId"];
  $packageItem = addslashes($_POST["packageItem"]);

  $response = new stdClass();

  $query = "
    SELECT * FROM bookings_tbl WHERE id_user = $userId AND id_service = $serviceId AND status IN ('Pending', 'Inprogress')
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  $row = $statement->fetch(PDO::FETCH_ASSOC);

  if ($row !== false) {
    $response->error = new stdClass();
    $response->error->title = "Booking Error";
    $response->error->message = "You already have an active booking with the selected service.";
    
    print_r(json_encode($response));
    die;
  }

  $mutate = "
    INSERT INTO `bookings_tbl`
    (`id_user`, `id_service`,  `package_item`, `status`)
    VALUES ($userId, $serviceId, '$packageItem', 'Pending')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();
  $response->data = new stdClass();
  $response->data->title = "Created Booking";
  $response->data->message = "Successfully booked a service.";

  print_r(json_encode($response));

?>