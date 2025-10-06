<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT servc.*
    FROM services_tbl servc
    WHERE servc.status = 'Published'
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
  $response->data->services = $arr;

  echo json_encode($response);

?>