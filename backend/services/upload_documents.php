<?php
  require "../db.php";

  header('Content-Type: application/json');

  $response = new stdClass();

  if (!empty($_FILES['files'])) {
      $uploadDir = '../uploads/';
      $uploaded = [];

      foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
          $error = $_FILES['files']['error'][$index];
          $name  = uniqid() . '_' . basename($_FILES['files']['name'][$index]);

          if ($error === UPLOAD_ERR_OK) {
              $target = $uploadDir . $name;
              if (move_uploaded_file($tmpName, $target)) {
                  $file = new stdClass();
                  $file->url = $name;
                  $file->name = basename($_FILES['files']['name'][$index]);
                  $file->type = $_FILES['files']['type'][$index];
                  $uploaded[] = $file;
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