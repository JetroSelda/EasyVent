<?php

  require "../db.php";

  $id = $_POST["id"];

  $user1Id = $_POST["user1Id"];
  $user1Name = $_POST["user1Name"];
  $user1Image = $_POST["user1Image"];

  $user2Id = $_POST["user2Id"];
  $user2Name = $_POST["user2Name"];
  $user2Image = $_POST["user2Image"];

  $mutate = "
    UPDATE `bookings_tbl`
    SET
        `status`='Confirmed'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif */

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($user2Id, $id, 'Confirmed Booking', 'Your booking has been confirmed.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  $query = "
    INSERT INTO `conversations_tbl`
      (`id_user1`, `id_user2`, `user1_name`, `user2_name`, `user1_image`, `user2_image`)
    VALUES
      ($user1Id,$user2Id,'$user1Name','$user2Name','$user1Image','$user2Image')
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  $convoId = $connect->lastInsertId();

  $initialMessage = "Your reservation at $user1Name is confirmed! We're looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime";
  $slashedMsg = addslashes($initialMessage);
  $query = "
    INSERT INTO `messages_tbl`
      (`id_sender`, `id_convo`, `message`)
    VALUES
      ($user1Id, $convoId,'$slashedMsg')
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->title = "Booking Confirmation";
  $response->data->message = "Successfully confirmed booking request.";

  $mutate = "
    INSERT INTO `logs_tbl`
      (`title`, `description`, `role`, `id_author`)
    VALUES ('Confirmed Booking','Confirmed booking for customer $user2Name','Provider','$user1Id')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  print_r(json_encode($response));

?>