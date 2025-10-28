<?php

  require "../db.php";

  $response = new stdClass();

  $id = $_POST["id"];
  $status = $_POST["status"];
  $email = $_POST["email"];
  $userId = $_POST["userId"];

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

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('$status User','$status user $email','Admin','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>