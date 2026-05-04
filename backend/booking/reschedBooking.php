<?php

  require "../db.php";

  $id = $_POST["id"];
  $schedule = $_POST["schedule"];

  $providerId = $_POST["providerId"];

  $mutate = "
    UPDATE `bookings_tbl`
    SET
        `status`='Reschedule',
        `schedule`='$schedule'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif */

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($providerId, $id, 'Reschedule Booking', 'Customer requested to re-scheduled a booking.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->title = "Booking Reschedule";
  $response->data->message = "Successfully submitted reschedule request.";

  print_r(json_encode($response));

?>