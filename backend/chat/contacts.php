<?php

  require "../db.php";
  $response = new stdClass();

  $userId = $_POST["userId"];

  $contacts = [];

  $query = "
    SELECT *
    FROM `conversations_tbl` conv
    LEFT JOIN (
    SELECT id_convo, MAX(created_at) AS max_created_at
    FROM messages_tbl
    GROUP BY id_convo
    ORDER BY created_at DESC
    ) ml ON ml.id_convo = conv.id
    LEFT JOIN messages_tbl m_latest 
    ON m_latest.id_convo = conv.id
        AND m_latest.created_at = ml.max_created_at
    WHERE conv.id_user1 = $userId OR conv.id_user2 = $userId
    ORDER BY m_latest.created_at DESC
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($result !== false) {
    foreach($result as $res) {
      array_push($contacts, $res);
    }
  }
  
  $response->data = new stdClass();
  $response->data->contacts = $contacts;

  echo json_encode($response);

?>