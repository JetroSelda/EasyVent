<?php

  require "../db.php";
  date_default_timezone_set('Asia/Manila');

  $reference = $_POST["reference"];
  $response = new stdClass();

  $query = "
    SELECT usertbl.email, invitationtbl.expiration_date, usertbl.id, usertbl.role
    FROM users_tbl usertbl, user_invitations_tbl invitationtbl
    WHERE invitationtbl.reference = '$reference' AND invitationtbl.id_user = usertbl.id
  ";
  
  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetch(PDO::FETCH_ASSOC);
  
  if ($result === false) {
    $response->error = new stdClass();
    $response->error->message = "Invitation link does not exist.";

    echo json_encode($response);
    die;
  }

  $exp = new DateTime($result["expiration_date"]);
  $today = new DateTime();

  if ($exp < $today) {
    $response->error = new stdClass();
    $response->error->message = "Invitation link has already been expired.";

    echo json_encode($response);
    die;
  }

  $response->data = new stdClass();
  $response->data->invitation = $result;

  echo json_encode($response);
?>