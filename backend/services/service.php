<?php

  require "../db.php";
  
  $response = new stdClass();

  $id = $_POST["id"];
  
  $query = "
    SELECT servc.*, usert.contacts, usert.email
    FROM services_tbl servc, user_providers_tbl userp, users_tbl usert
    WHERE servc.id = $id AND userp.id_user = usert.id AND userp.id_service = servc.id
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetch(PDO::FETCH_ASSOC);

  if ($result !== false) {
    $response->data = new stdClass();
    $response->data->service = $result;

    echo json_encode($response);
    exit;
  }

  $response->data = new stdClass();
  $response->data->service = new stdClass();

  echo json_encode($response);

?>