<?php

  require "../db.php";

  $id = $_POST["id"];
  $terms = addslashes($_POST["terms"]);

  $mutate = "
    UPDATE `settings_tbl`
    SET
        `terms`='$terms'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated Terms and Conditions.";

  print_r(json_encode($response));

?>