<?php

  require "../db.php";

  $response = new stdClass();

  $id = $_POST["id"];
  $status = $_POST["status"];

  $mutate = "
    UPDATE `users_tbl`
    SET `status`='$status'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->title = "Successfully updated user.";
  $response->data->message = "You have successfully updated user status.";

  print_r(json_encode($response));

?>