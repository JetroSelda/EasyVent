<?php

  require "../db.php";
  $response = new stdClass();

  $id = $_POST["id"];


  $mutate = "
    UPDATE `users_tbl`
    SET
      `status`='Verification'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->title = "Updated User.";
  $response->data->message = "Successfully updated user new password.";

  print_r(json_encode($response));
?>