<?php

  require "../db.php";

  $query = '
    SELECT * FROM users_tbl
  ';
  
  $statement = $connect->prepare($query);
  $statement->execute();
  
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $arr = [];
  
  foreach($result as $res) {
    array_push($arr, $res);
  }

  $response = new stdClass();
  $response->users = $arr;

  print_r(json_encode($response));

?>