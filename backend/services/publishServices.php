<?php

  require "../db.php";
  
  $response = new stdClass();

  $query = "
    SELECT 
      s.*, 
      CONCAT('[', 
          IFNULL(GROUP_CONCAT(JSON_OBJECT('comment', c.comment, 'rating', c.rating) ORDER BY c.id), ''), 
      ']') AS comments
    FROM 
        services_tbl s
    LEFT JOIN 
        comments_tbl c ON s.id = c.id_service
    WHERE s.status = 'Published'
    GROUP BY 
        s.id
    ORDER BY 
        s.id;
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