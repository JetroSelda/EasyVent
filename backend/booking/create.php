<?php

  require "../db.php";

  $userId = $_POST["userId"];
  $serviceId = $_POST["serviceId"];
  $schedule = $_POST["schedule"];
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
    (`id_user`, `id_service`,  `package_item`, `schedule`, `status`)
    VALUES ($userId, $serviceId, '$packageItem', '$schedule', 'Pending')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif */

  $query = "
    SELECT userptbl.id_user, servctbl.property_name
    FROM services_tbl servctbl, user_providers_tbl userptbl
    WHERE servctbl.id = $serviceId AND servctbl.id = userptbl.id_service
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $providerId = $row["id_user"];
  $providerProperty = addslashes($row["property_name"]);

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($providerId, $serviceId, 'New Booking', '$providerProperty has a new booking', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $response->data = new stdClass();
  $response->data->title = "Created Booking";
  $response->data->message = "Successfully booked a service.";

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Created Booking','Booked a new service','Provider','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();
  

  print_r(json_encode($response));

?>