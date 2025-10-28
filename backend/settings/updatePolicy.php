<?php

  require "../db.php";

  $id = $_POST["id"];
  $policy = addslashes($_POST["policy"]);

  $mutate = "
    UPDATE `settings_tbl`
    SET
        `policy`='$policy'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated Privacy Policy.";

  print_r(json_encode($response));

?>