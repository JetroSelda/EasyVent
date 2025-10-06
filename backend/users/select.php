<?php

  require "../db.php";

  $email = "ok";

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

  echo $arr[0]["personal_name"];
?>