<?php

  require "../db.php";
  $response = new stdClass();

  $id = $_POST["id"];
  $password = $_POST["password"];

  $hash = password_hash($password, PASSWORD_DEFAULT);

  $mutate = "
    UPDATE `users_tbl`
    SET
      `password`='$hash'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->title = "Updated User.";
  $response->data->message = "Successfully updated user new password.";

  print_r(json_encode($response));
?>