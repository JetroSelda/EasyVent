<?php

  require "../db.php";
  
  $response = new stdClass();

  $userId = $_POST["userId"];
  $category = isset($_POST["category"]) ? $_POST["category"] : false;
  $status = isset($_POST["status"]) ? $_POST["status"] : false;

  $categoryCondition = "";
  $statusCondition = "";

  if ($category) {
    $categoryCondition = "AND servc.category IN ($category)";
  }

  if ($status) {
    $statusCondition = "AND servc.status IN ($status)";
  }
  
  $query = "
    SELECT servc.id, servc.property_name, servc.category, servc.status, servc.packages_list
    FROM user_providers_tbl userP, services_tbl servc
    WHERE userP.id_service = servc.id AND userP.id_user = $userId $categoryCondition $statusCondition
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