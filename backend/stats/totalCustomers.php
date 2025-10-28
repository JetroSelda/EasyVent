<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT *
    FROM users_tbl
    WHERE role = 'Customer'
  ";

  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $arr = [];

  if ($result !== false) {
    foreach($result as $res) {
      array_push($arr, $res);
    }
  }

  $response->data = new stdClass();
  $response->data->users = $arr;

  echo json_encode($response);

?>