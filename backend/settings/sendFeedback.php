<?php

  require "../db.php";

  $name = addslashes($_POST["name"]);
  $email = addslashes($_POST["email"]);
  $title = addslashes($_POST["title"]);
  $description = addslashes($_POST["description"]);

  $mutate = "
    INSERT INTO `feedbacks_tbl`
      (`name`, `email`, `title`, `description`)
    VALUES ('$name','$email','$title', '$description')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif */

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`user_type`, `title`, `description`, `status`)
    VALUES ('Admin', 'New Feedback', '$title', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->title = "Created Feedback";
  $response->data->message = "Successfully sent a feedback to our team.";

  print_r(json_encode($response));

?>