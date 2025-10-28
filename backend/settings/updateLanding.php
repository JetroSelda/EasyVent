<?php

  require "../db.php";

  $id = $_POST["id"];
  $landing_title = addslashes($_POST["landing_title"]);
  $landing_description = addslashes($_POST["landing_description"]);
  $landing_bg = addslashes($_POST["landing_bg"]);

  $mutate = "
    UPDATE `settings_tbl`
    SET
        `landing_title`='$landing_title',
        `landing_description`='$landing_description',
        `landing_bg`='$landing_bg'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated Landing Page.";

  print_r(json_encode($response));

?>