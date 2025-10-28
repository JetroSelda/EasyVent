<?php

  require "../db.php";

  $id = $_POST["id"];
  $reason = addslashes($_POST["reason"]);
  $name = $_POST["name"];
  $userId = $_POST["userId"];

  $mutate = "
    UPDATE `bookings_tbl`
    SET
        `reason`='$reason',
        `status`='Rejected'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->title = "Booking Rejection";
  $response->data->message = "Successfully rejected booking request.";

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
    VALUES ($customerId, $id, 'Rejected Booking', 'Your booking has been rejected.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Rejected Booking','Rejected booking for customer $name','Provider','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>