<?php

  require "../db.php";
  
  $response = new stdClass();

  $id = $_POST["id"];

  $query = "
    UPDATE notifications_tbl SET status = 'Read' WHERE id = $id
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

?>