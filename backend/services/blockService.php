<?php

  require "../db.php";

  $id = $_POST["id"];
  $status = $_POST["status"];
  $block_reason = addslashes($_POST["block_reason"]);

  $mutate = "
    UPDATE `services_tbl`
    SET
      `status`='$status',
      `block_reason`='$block_reason'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated service.";
  $response->data->id = $id;

  print_r(json_encode($response));

?>