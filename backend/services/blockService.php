<?php

  require "../db.php";

  $id = $_POST["id"];
  $status = $_POST["status"];
  $block_reason = addslashes($_POST["block_reason"]);

  $mutate = "
    UPDATE `services_tbl`
    SET
      `status`='$status',
      `block_reason`='$block_reason'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated service.";
  $response->data->id = $id;

  /* Creating Notif */

  $query = "
    SELECT userptbl.id_user, servctbl.property_name
    FROM services_tbl servctbl, user_providers_tbl userptbl
    WHERE servctbl.id = $id AND servctbl.id = userptbl.id_service
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $providerId = $row["id_user"];
  $providerProperty = addslashes($row["property_name"]);

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($providerId, $id, '$status Listing', '$providerProperty has been $status.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

  print_r(json_encode($response));

?>