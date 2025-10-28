<?php

  require "../db.php";

  $rating = $_POST["rating"];
  $comment = addslashes($_POST["comment"]);
  $userId = $_POST["userId"];
  $serviceId = $_POST["serviceId"];
  $bookingId = $_POST["bookingId"];

  $response = new stdClass();

  $mutate = "
    INSERT INTO `comments_tbl`
    (`id_user`, `id_service`,  `id_booking`, `rating`, `comment`)
    VALUES ($userId, $serviceId, $bookingId, $rating, '$comment')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();
  $response->data = new stdClass();
  $response->data->title = "Submitted Comment";
  $response->data->message = "Successfully created comment.";

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Created Comment','Submitted a new feedback','Provider','$userId')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>