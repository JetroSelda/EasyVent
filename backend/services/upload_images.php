<?php
  require "../db.php";

  header('Content-Type: application/json');

  $response = new stdClass();

  if (!empty($_FILES['images'])) {
      $uploadDir = '../uploads/';
      $uploaded = [];

      foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {
          $error = $_FILES['images']['error'][$index];
          $name  = uniqid() . '_' . basename($_FILES['images']['name'][$index]);

          if ($error === UPLOAD_ERR_OK) {
              $target = $uploadDir . $name;
              if (move_uploaded_file($tmpName, $target)) {
                  $uploaded[] = $name;
              } else {
                  $uploaded[] = ["error" => "Failed moving {$name}"];
              }
          } else {
              $uploaded[] = ["error" => "Error code {$error} on file {$name}"];
          }
      }

      echo json_encode(['status' => 'success', 'files' => $uploaded]);
  } else {
      echo json_encode(['status' => 'error', 'message' => 'No files received']);
  }


?>