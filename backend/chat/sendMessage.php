<?php

  require "../db.php";
  
  $response = new stdClass();

  $convoId = $_POST["convoId"];
  $senderId = $_POST["senderId"];
  $receiverId = $_POST["receiverId"];
  $message = addslashes($_POST["message"]);

  $mutate = "
    INSERT INTO `messages_tbl`
      (`id_sender`, `id_convo`, `message`)
    VALUES
      ($senderId, $convoId, '$message')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif */

  $query = "
    SELECT personal_name, last_name
    FROM users_tbl
    WHERE id = $senderId
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $personal_name = $row["personal_name"];
  $last_name = $row["last_name"];

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($receiverId, $senderId, '$personal_name $last_name', '$message', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  
  $response->data = new stdClass();
  $response->data->message = $message;

  echo json_encode($response);


?>