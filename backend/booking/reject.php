<?php

  require "../db.php";

  $id = $_POST["id"];
  $reason = addslashes($_POST["reason"]);

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

  print_r(json_encode($response));

?>