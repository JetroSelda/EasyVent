<?php

  require "../db.php";

  $question = addslashes($_POST["question"]);
  $response = addslashes($_POST["response"]);

  $mutate = "
    INSERT INTO `quick_messages_tbl`
      (`question`, `response`, `status`)
    VALUES ('$question','$response','Active')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully created questions.";

  print_r(json_encode($response));

?>