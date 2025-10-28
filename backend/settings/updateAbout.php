<?php

  require "../db.php";

  $id = $_POST["id"];
  $about = addslashes($_POST["about"]);

  $mutate = "
    UPDATE `settings_tbl`
    SET
        `about`='$about'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated About Page.";

  print_r(json_encode($response));

?>