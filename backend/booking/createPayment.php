<?php

  require "../db.php";

  $bookingId = $_POST["bookingId"];
  $userId = $_POST["userId"];
  $paymentReceipt = addslashes($_POST["paymentReceipt"]);
  $paymentMethod = addslashes($_POST["paymentMethod"]);

  $response = new stdClass();

  $mutate = "
    UPDATE `bookings_tbl`
    SET
      `payment_receipt`='$paymentReceipt',
      `payment_method`='$paymentMethod',
      `status`='Payment Verification'
    WHERE id = $bookingId
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->title = "Created Payment";
  $response->data->message = "Successfully submitted a payment.";

  /* Creating Notif */

  $query = "
    SELECT userptbl.id_user, servctbl.property_name, servctbl.id
    FROM services_tbl servctbl, user_providers_tbl userptbl, bookings_tbl booktbl
    WHERE servctbl.id = userptbl.id_service AND booktbl.id = $bookingId AND booktbl.id_service = userptbl.id_service
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $providerId = $row["id_user"];
  $serviceId = $row["id"];
  $providerProperty = addslashes($row["property_name"]);

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($providerId, $serviceId, 'New Payment', '$providerProperty has a new payment', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Created Payment','Submitted a new payment for verification','Provider','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>