<?php

require "../db.php";
  
  $response = new stdClass();

  $bookingId = $_POST["bookingId"];

  $query = "
    SELECT id, rating, comment
    FROM comments_tbl
    WHERE id_booking = $bookingId
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetch(PDO::FETCH_ASSOC);

  $response->data = new stdClass();
  $response->data->comment = $result ? $result : new stdClass();

  echo json_encode($response);

?>