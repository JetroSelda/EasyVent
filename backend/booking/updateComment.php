<?php

  require "../db.php";

  $id = $_POST["id"];
  $rating = $_POST["rating"];
  $comment = addslashes($_POST["comment"]);

  $response = new stdClass();

  $mutate = "
    UPDATE `comments_tbl`
    SET `rating`= $rating, `comment` = '$comment'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();
  $response->data = new stdClass();
  $response->data->title = "Submitted Comment";
  $response->data->message = "Successfully updated comment.";

  print_r(json_encode($response));

?>