<?php

  require "../db.php";

  header('Content-Type: application/json');

  $response = new stdClass();

  $uploadDir = '../uploads/';
  $maxSize = 2 * 1024 * 1024; // 2MB
  $allowed = ['image/jpeg','image/png'];
  $photoUrl = "";
  $photoQuery = "";

  if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $tmp = $_FILES['file']['tmp_name'];
    $name = basename($_FILES['file']['name']);
    $size = $_FILES['file']['size'];
    $type = mime_content_type($tmp);

    if (!in_array($type, $allowed)) {
      $response->error = new stdClass();
      $response->error->title = "Validation Error";
      $response->error->message = "Invalid Profile Photo file type.";
      echo json_encode($response);
      exit;
    }
    if ($size > $maxSize) {
      $response->error = new stdClass();
      $response->error->title = "Validation Error";
      $response->error->message = "Profile Photo file too large.";
      echo json_encode($response);
      exit;
    }

    $photoUrl = uniqid() . '_' . $name;
    $target = $uploadDir . $photoUrl;
    $photoQuery = ", `display_picture` = '$photoUrl'";

    if (!move_uploaded_file($tmp, $target)) {
      $response->error = new stdClass();
      $response->error->title = "Server Error";
      $response->error->message = "Failed to move file.";
      echo json_encode($response);
      exit;
    }
  }

  $id = $_POST["id"];
  $personal_name = $_POST["personal_name"];
  $last_name = $_POST["last_name"];
  $email = $_POST["email"];
  $contacts = $_POST["contacts"];
  $date_of_birth = $_POST["date_of_birth"];
  $bio = $_POST["bio"];

  // Check if email existing already
  $query = "
    SELECT * FROM users_tbl WHERE email = '$email' AND id <> $id
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $response = new stdClass();

  if ($row !== false) {
    $response->error = new stdClass();
    $response->error->title = "Validation Error";
    $response->error->message = "Email has already been used.";
    
    print_r(json_encode($response));
    exit;
  }

  $mutate = "
    UPDATE `users_tbl`
    SET
      `email`='$email',
      `personal_name`='$personal_name',
      `last_name`='$last_name',
      `bio`='$bio',
      `date_of_birth`='$date_of_birth',
      `contacts`='$contacts' $photoQuery
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $lastId = $connect->lastInsertId();

  $response->data = new stdClass();
  $response->data->title = "Successfully updated user.";
  $response->data->message = "Redirecting into Dashboard.";
  $response->data->id = $lastId;
  $response->data->display_picture = $photoUrl;

  print_r(json_encode($response));

?>