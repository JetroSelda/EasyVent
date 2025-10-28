<?php

  require "../db.php";

  $id = $_POST["id"];
  $userId = $_POST["userId"];
  $name = $_POST["name"];

  $response = new stdClass();

  $mutate = "
    UPDATE `bookings_tbl`
    SET
      `status`='Confirmed'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->title = "Updated Booking";
  $response->data->message = "Successfully rejected booking payment.";

  /* Creating Notif */

  $query = "
    SELECT id_user
    FROM bookings_tbl
    WHERE id = $id
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $customerId = $row["id_user"];

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($customerId, $id, 'Rejected Payment', 'Your payment has been rejected.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Rejected Payment','Rejected Payment for customer $name','Provider','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>