<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];

  $query = "
    SELECT logtbl.title, logtbl.description, logtbl.created_at, usertbl.personal_name, usertbl.last_name FROM logs_tbl logtbl, users_tbl usertbl WHERE logtbl.id_author = usertbl.id AND logtbl.id_author = $userId
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
  $response->data->logs = $arr;

  echo json_encode($response);

?>