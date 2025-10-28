<?php

  require "../db.php";

  $id = $_POST["id"];
  $status = $_POST["status"];
  $question = addslashes($_POST["question"]);
  $response = addslashes($_POST["response"]);

  $mutate = "
    UPDATE `quick_messages_tbl`
        SET `question`='$question',`response`='$response',`status`='$status'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated questions.";

  print_r(json_encode($response));

?>